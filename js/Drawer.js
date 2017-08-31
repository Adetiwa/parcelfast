/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "./components/home/";
import Header from "./components/Header/";
import Anatomy from "./components/anatomy/";
import Footer from "./components/footer/";
import NHBadge from "./components/badge/";
import NHButton from "./components/button/";
import NHCard from "./components/card/";
import NHCheckbox from "./components/checkbox/";
import NHDeckSwiper from "./components/deckswiper/";
import NHFab from "./components/fab/";
import NHForm from "./components/form/";
import TextArea from "./components/form/textArea";
import NHIcon from "./components/icon/";
import ListSwipe from "./components/listSwipe/";
import BasicIcon from "./components/icon/basic";
import IconState from "./components/icon/state";
import SpecificIcon from "./components/icon/specific";
import NHInputGroup from "./components/inputgroup/";
import NHLayout from "./components/layout/";
import NHList from "./components/list/";
import NHRadio from "./components/radio/";
import NHSearchbar from "./components/searchbar/";
import NHSpinner from "./components/spinner/";
import NHPicker from "./components/picker/";
import NHTab from "./components/tab/";
import NHThumbnail from "./components/thumbnail/";
import NHTypography from "./components/typography/";
import SplashPage from "./components/splashscreen/";
import SideBar from "./components/sidebar";
import Segment from "./components/segment";
import Toast from "./components/toast";
import Actionsheet from "./components/actionsheet";
import Map from "./components/map";
import Pickup from "./components/pickup";
import Dropoff from "./components/dropoff";
import Summary from "./components/summary";
import Init from "./components/init";
import Confirm from "./components/confirm";
import CardView from "./components/cardinput";
import Profile from "./components/profile";
import History from "./components/history";
import Orders from "./components/orders";
import Payment from "./components/payment";
import Single from "./components/single";

const DrawerExample = DrawerNavigator(
  {
    Home: { screen: Home },
    Anatomy: { screen: Anatomy },
    Header: { screen: Header },
    Footer: { screen: Footer },
    NHBadge: { screen: NHBadge },
    NHButton: { screen: NHButton },
    NHCard: { screen: NHCard },
    NHCheckbox: { screen: NHCheckbox },
    NHDeckSwiper: { screen: NHDeckSwiper },
    NHFab: { screen: NHFab },
    NHForm: { screen: NHForm },
    TextArea: { screen: TextArea },
    NHIcon: { screen: NHIcon },
    BasicIcon: { screen: BasicIcon },
    IconState: { screen: IconState },
    SpecificIcon: { screen: SpecificIcon },
    NHInputGroup: { screen: NHInputGroup },
    NHLayout: { screen: NHLayout },
    NHList: { screen: NHList },
    ListSwipe: { screen: ListSwipe },
    NHRadio: { screen: NHRadio },
    NHSearchbar: { screen: NHSearchbar },
    NHSpinner: { screen: NHSpinner },
    NHPicker: { screen: NHPicker },
    NHTab: { screen: NHTab },
    NHThumbnail: { screen: NHThumbnail },
    NHTypography: { screen: NHTypography },
    Segment: { screen: Segment },
    Toast: { screen: Toast },
    Actionsheet: { screen: Actionsheet },
    Map: { screen: Map },
    Pickup: { screen: Pickup},
    Dropoff: { screen: Dropoff},
    Summary: {screen: Summary},
    Home: {screen: Home},
    Init: {screen: Init},
    Confirm: {screen: Confirm},
    CardView: {screen: CardView},
    Profile: {screen: Profile},
    History: {screen: History},
    Payment: {screen: Payment},
    Orders: { screen: Orders },
    Single: { screen: Single},

  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
