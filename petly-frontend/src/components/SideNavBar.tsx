import { useState } from 'react';
import {
 
  IconBellRinging,
  IconDatabaseImport,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import { Logo } from './Logo';
import classes from '../styles/SideNavBar.module.css';

import { useParams } from 'react-router-dom';




export function SideNavBar() {
    
const { petId } = useParams();

const generalLinks = [
  { link: '/pets', label: 'My Pets', icon: IconBellRinging },
  { link: '/settings', label: 'Settings', icon: IconSettings },
];

const petSpecificLinks = [
  { link: `/pets/${petId}/feeding`, label: 'Feeding', icon: IconReceipt2 },
  { link: `/pets/${petId}/analytics`, label: 'Analytics', icon: IconDatabaseImport },
  { link: `/pets/${petId}/settings`, label: 'Pet Settings', icon: IconSettings },
];

const linksToRender = petId ? petSpecificLinks : generalLinks;
  const [active, setActive] = useState('My Pets');

 const links = linksToRender.map((item) => (
  <a
    className={classes.link}
    data-active={item.label === active || undefined}
    href={item.link}
    key={item.label}
    onClick={(event) => {
      event.preventDefault();
      setActive(item.label);
    }}
  >
    <item.icon className={classes.linkIcon} stroke={1.5} />
    <span>{item.label}</span>
  </a>
));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Logo />
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}