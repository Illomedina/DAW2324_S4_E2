import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "./SideBar.css";

export function SideBar({ toggleSidebar }) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    toggleSidebar(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    toggleSidebar(false);
  };

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh)] custom-background w-56 rounded-none "
        >
          <div className="mb-5 flex items-center gap-4 p-4">
            <Typography variant="h5" color="white">
              CustomAIze
            </Typography>
          </div>
          <List>
            <Accordion>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                Home
              </ListItem>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                Products
              </ListItem>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                Claims
              </ListItem>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                Benefits
              </ListItem>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                Clients
              </ListItem>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                Translations
              </ListItem>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                CMS
              </ListItem>
              <ListItem className="text-white">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5 text-white " />
                </ListItemPrefix>
                Settings
              </ListItem>
            </Accordion>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
export default SideBar;
