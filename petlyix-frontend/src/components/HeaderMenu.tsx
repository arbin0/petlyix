import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Button, Center, Container, Group, Menu} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Logo } from './Logo';
import classes from '../styles/HeaderMenu.module.css';
import { Link } from 'react-router-dom';
import SideNavContext from '../context/SideNavBarContext';
import { useContext } from 'react';
import { AuthModal } from './Modals/AuthModal';
import { useEffect, useState } from 'react';
import { authApi } from '../api/auth';
import { api } from '../api/client';

const links = [
  { link: 'about', label: 'Features' },
  {
    link: '#1',
    label: 'Learn',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: 'about', label: 'About' },
  { link: '/pets', label: 'My Pets' },
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

export const HeaderMenu: React.FC = () => {
  // Authentication Logic start
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          // Use the new API client
          const userData = await api.get('/users/user/');
          setLoggedIn(true);
          setUsername(userData.username);
        } else {
          setLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        setLoggedIn(false);
        setUsername("");
      }
    };
    checkLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout(); // Use the new auth API
      setLoggedIn(false);
      setUsername("");
    } catch (error) {
      console.warn("Logout error:", error);
      // Still clear local state even if server logout fails
      setLoggedIn(false);
      setUsername("");
    }
  };

  // Authentication Logic End
  const isSideNav = useContext(SideNavContext);
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <Link
              to={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown width="16" height="16" />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="xl">
        <div className={classes.inner}>
          {!isSideNav && <Link to="/"><Logo /></Link>}
                    
          <Group gap={5} visibleFrom="sm">
            {items}
            
            <Group ml="auto" visibleFrom="sm">
              {isLoggedIn ? (
                <>
                  Hi {username}
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <AuthModal type="login"/>
                  <AuthModal type="signup"/>
                </>
              )}
            </Group>
          </Group>
        
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
};
