import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Button, Select, Checkbox } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';

import game from './game.js';

function App() {
  const [currentLocation, setCurrentLocation] = useState(game.currentLocation);
  const [health, setHealth] = useState(game.health);
  const [totalValueScore, setTotalValueScore] = useState(0);
  const [bagSpace, setBagSpace] = useState(game.bagSpace);
  const [bag, setBag] = useState([]);

  useEffect(() => {
    setTotalValueScore(bag.reduce((a, b) => a + b.value, 0));
    setBagSpace(game.bagSpace - bag.reduce((a, b) => a + b.space, 0));
  }, [bag]);

  const goToLocation = (location) => {
    setHealth(health - currentLocation.npcs.filter((npc) => npc.isEnemy).length);
    setCurrentLocation(location);
  };

  const pickupItem = (item) => {
    setBag([...bag, item]);
    currentLocation.items.splice(
      currentLocation.items.findIndex((it) => it.name === item.name),
      1
    );
    setHealth(health - currentLocation.npcs.filter((npc) => npc.isEnemy).length);
  };

  const dropItem = (item) => {
    setBag(bag.filter((it) => it.name !== item.name));
    currentLocation.items.push(item);
  };

  const attackEnemy = (enemy) => {
    currentLocation.npcs.splice(
      currentLocation.npcs.findIndex((npc) => npc.name === enemy.name),
      1
    );
    setHealth(health - 1);
    enemy.items.forEach((item) => currentLocation.items.push(item));
  };

  const tradeWithFriendly = (npc, itemToGive, itemToReceive) => {
    setBag([...bag.filter((it) => it.name !== itemToGive.name), itemToReceive]);
    npc.items.push(itemToGive);
    npc.items.splice(
      npc.items.findIndex((it) => it.name === itemToReceive.name),
      1
    );
  };

  const giveItem = (npc, item) => {
    setBag(bag.filter((it) => it.name !== item.name));
    npc.items.push(item);
  };

  return (
    <Box p={5}>
      <Flex justifyContent='space-between' pb={5}>
        <Heading fontSize={20}>Skyrimmer</Heading>
        <ColorModeSwitcher />
      </Flex>
      <Box pb={5}>
        <Text>Current location: {currentLocation.name}</Text>
        <Text>Health: {health}</Text>
        <Text>Total value score: {totalValueScore}</Text>
        <Text>Bag space: {bagSpace}</Text>
      </Box>
      <Flex wrap='wrap' pb={5}>
        <Column>
          <Text>Go to neighbouring locations:</Text>
          {currentLocation.neighbours.map((location) => (
            <Button
              key={location.name}
              onClick={() => goToLocation(location)}
              isDisabled={
                !location.itemNeeds.every((item) => bag.find((it) => it.name === item.name))
              }
            >
              {location.name}
              {location.itemNeeds.length > 0 &&
                ' - requires: ' + location.itemNeeds.map((item) => item.name).join(', ')}
            </Button>
          ))}
        </Column>
        <Column>
          <Text>Pickup items in current location:</Text>
          {currentLocation.items.map((item) => (
            <Button
              key={item.name}
              onClick={() => pickupItem(item)}
              isDisabled={item.space > bagSpace}
            >
              {item.name}
            </Button>
          ))}
        </Column>
        <Column>
          <Text>Drop items in bag:</Text>
          {bag.map((item) => (
            <Button key={item.name} onClick={() => dropItem(item)}>
              {item.name}
            </Button>
          ))}
        </Column>
        <Column>
          <Text>Attack enemies:</Text>
          {currentLocation.npcs
            .filter((npc) => npc.isEnemy)
            .map((enemy) => (
              <Button key={enemy.name} onClick={() => attackEnemy(enemy)} isDisabled={health <= 1}>
                {enemy.name}
              </Button>
            ))}
        </Column>
        <Column>
          <Text>Trade with friendlies:</Text>
          {currentLocation.npcs
            .filter((npc) => !npc.isEnemy)
            .map((npc) => (
              <Trade
                key={npc.name}
                npc={npc}
                bag={bag}
                bagSpace={bagSpace}
                tradeWithFriendly={tradeWithFriendly}
              />
            ))}
        </Column>
        <Column>
          <Text>Give items to friendlies:</Text>
          {currentLocation.npcs
            .filter((npc) => !npc.isEnemy)
            .map((npc) => (
              <Give key={npc.name} npc={npc} bag={bag} giveItem={giveItem} />
            ))}
        </Column>
      </Flex>
      <Flex direction='column'>
        <Text>Goals:</Text>
        {game.itemInBagGoals.map((item) => (
          <Checkbox key={item} isDisabled isChecked={bag.find((it) => it.name === item.name)}>
            {item.name} in bag
          </Checkbox>
        ))}
        {Object.entries(game.itemOnNPCGoals).map(([itemName, npc]) => (
          <Checkbox
            key={itemName}
            isDisabled
            isChecked={npc.items.find((it) => it.name === itemName)}
          >
            {itemName} on {npc.name}
          </Checkbox>
        ))}
      </Flex>
    </Box>
  );
}

const Trade = ({ npc, bag, bagSpace, tradeWithFriendly }) => {
  const [itemToReceive, setItemToReceive] = useState();
  const [itemToGive, setItemToGive] = useState();

  useEffect(() => {
    setItemToGive(bag.find((it) => it.name === itemToGive?.name));
  }, [bag, itemToGive]);

  const onSelectItemToReceive = (e) => {
    setItemToReceive(npc.items.find((it) => it.name === e.target.value));
  };

  const onSelectItemToGive = (e) => {
    setItemToGive(bag.find((it) => it.name === e.target.value));
  };

  return (
    <Box pb={5}>
      <Text>{npc.name} will give</Text>
      <Select placeholder='Select item to receive' onChange={onSelectItemToReceive}>
        {npc.items.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </Select>
      <Text>for</Text>
      <Select placeholder='Select item to give' onChange={onSelectItemToGive}>
        {npc.itemWants.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </Select>
      <Button
        onClick={() => tradeWithFriendly(npc, itemToGive, itemToReceive)}
        isDisabled={!itemToReceive || !itemToGive || itemToReceive?.space > bagSpace}
      >
        Trade
      </Button>
    </Box>
  );
};

const Give = ({ npc, bag, giveItem }) => {
  const [item, setItem] = useState();

  useEffect(() => {
    setItem(bag.find((it) => it.name === item?.name));
  }, [bag, item]);

  const onSelect = (e) => {
    setItem(bag.find((it) => it.name === e.target.value));
  };

  return (
    <Box pb={5}>
      <Text>{npc.name}</Text>
      <Select placeholder='Select item to give' onChange={onSelect}>
        {bag.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </Select>
      <Button onClick={() => giveItem(npc, item)} isDisabled={!item}>
        Give
      </Button>
    </Box>
  );
};

const Column = ({ children }) => (
  <Flex direction='column' minW='20rem' pr={5} pb={5}>
    {children}
  </Flex>
);

export default App;
