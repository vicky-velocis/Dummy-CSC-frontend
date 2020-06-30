import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import "../utils/index.css";
import FormIcon from "../../../../ui-atoms-local/Icons/FormIcon";

const header = getCommonHeader(
    {
      labelName: "Rented Properties",
      labelKey: "RP_COMMON_RP"
    },
    {
      classes: {
        root: "common-header-cont"
      }
    }
  );

  const cardItems = [{
    label: {
        labelKey: "MASTER_ENTRY",
        labelName: "Master Entry"
    },
    icon: <FormIcon />,
    route: "search"
  },
  {
    label: {
        labelKey: "OWNER_SHIP_TRANSFER_HEADER",
        labelName: "Transfer of Transit site In case of Legal Heir (Ownership Transfer)"
    },
    icon: <FormIcon />,
    route: "search-transfer-properties"
  },
  {
    label: {
        labelKey: "DUPLICATE_COPY_HEADER",
        labelName: "Duplicate copy of Allotment letter"
    },
    icon: <FormIcon />,
    route: "search-transfer-properties"
  },
  {
    label: {
        labelKey: "MORTAGE_HEADER",
        labelName: "Mortgage"
    },
    icon: <FormIcon />,
    route: "search-transfer-properties"
  },

]

const cardItems2 = [
  {
    label: {
        labelKey: "ACCOUNT_STATEMENT_GENERATION_HEADER",
        labelName: "Account Statement Generation"
    },
    icon: <FormIcon />,
    route: "search-transfer-properties"
  },
  {
    label: {
        labelKey: "OFFLINE_RENT_AMOUNT_PAYMENT_HEADER",
        labelName: "Offline Rent amount payment"
    },
    icon: <FormIcon />,
    route: "search-transfer-properties"
  },
  {
    label: {
        labelKey: "NOTICE_GENERATION_HEADER",
        labelName: "Notice Gneration"
    },
    icon: <FormIcon />,
    route: "search-transfer-properties"
  },
  {
    label: {
        labelKey: "CAPTURING_TRANSIT_SITE_IMAGE_HEADER",
        labelName: "Capturing Transit site Images "
    },
    icon: <FormIcon />,
    route: "search-transfer-properties"
  }
]


  const home = {
    uiFramework: "material-ui",
    name: "home",
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          header: header,
          applyCard: {
            uiFramework: "custom-molecules",
            componentPath: "LandingPage",
            props: {
              items: cardItems,
              history: {},
              style: {
                width: "100%"
              }
            }
          },
          applyCard2: {
            uiFramework: "custom-molecules",
            componentPath: "LandingPage",
            props: {
              items: cardItems2,
              history: {},
              style: {
                width: "100%"
              }
            }
          },
        //   listCard: {
        //     uiFramework: "custom-molecules-local",
        //     moduleName: "egov-tradelicence",
        //     componentPath: "HowItWorks"
        //   }
        }
      }
      }
    }
  
  export default home;