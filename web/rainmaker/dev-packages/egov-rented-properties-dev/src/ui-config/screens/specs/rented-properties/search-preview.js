import {
    getCommonHeader,
    getCommonContainer,
    getLabel,
    getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg, setDocuments } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getReviewOwner, getReviewProperty, getReviewAddress, getReviewRentDetails, getReviewPaymentDetails } from "./applyResource/review-property";
import { getReviewDocuments } from "./applyResource/review-documents";
import { getUserInfo ,getTenantId} from "egov-ui-kit/utils/localStorageUtils";

const userInfo = JSON.parse(getUserInfo());
const {roles = []} = userInfo
const findItem = roles.find(item => item.code === "CTL_CLERK");

let transitNumber = getQueryArg(window.location.href, "transitNumber");

const headerrow = getCommonContainer({
  header: getCommonHeader({
    labelName: "Rented Properties",
    labelKey: "RP_COMMON_RENTED_PROPERTIES"
  })
});
const reviewOwnerDetails = getReviewOwner(false);
const reviewPropertyDetails = getReviewProperty(false);
const reviewAddressDetails = getReviewAddress(false);
const reviewRentDetails = getReviewRentDetails(false);
const reviewPaymentDetails = getReviewPaymentDetails(false);
const reviewDocumentDetails = getReviewDocuments(false, "apply")

export const propertyReviewDetails = getCommonCard({
  reviewPropertyDetails,
  reviewAddressDetails,
  reviewOwnerDetails,
  reviewRentDetails,
  reviewPaymentDetails,
  reviewDocumentDetails
});

export const searchResults = async (action, state, dispatch, transitNumber) => {
  let queryObject = [
    { key: "transitNumber", value: transitNumber }
  ];
  let payload = await getSearchResults(queryObject);
  if(payload) {
    let properties = payload.Properties;

    let applicationDocuments = properties[0].propertyDetails.applicationDocuments || [];
    const removedDocs = applicationDocuments.filter(item => !item.active)
    applicationDocuments = applicationDocuments.filter(item => !!item.active)
    properties = [{...properties[0], propertyDetails: {...properties[0].propertyDetails, applicationDocuments}}]
    dispatch(prepareFinalObject("Properties[0]", properties[0]));
    dispatch(
      prepareFinalObject(
        "PropertiesTemp[0].removedDocs",
        removedDocs
      )
    );
    await setDocuments(
      payload,
      "Properties[0].propertyDetails.applicationDocuments",
      "PropertiesTemp[0].reviewDocData",
      dispatch,'RP'
    );
  }
}

const beforeInitFn = async (action, state, dispatch, transitNumber) => {
  dispatch(prepareFinalObject("workflow.ProcessInstances", []))
  if(transitNumber){
    await searchResults(action, state, dispatch, transitNumber)
  }
}

const rentedPropertiesDetailPreview = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: (action, state, dispatch) => {
    transitNumber = getQueryArg(window.location.href, "transitNumber");
    beforeInitFn(action, state, dispatch, transitNumber);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: {
              gridDefination: {
                xs: 12,
                sm: 8
              },
             ...headerrow
            },
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" }
              },
              gridDefination: {
                xs: 12,
                sm: 4,
                align: "right"
              }
            }
            }
          },
          taskStatus: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-rented-properties",
            componentPath: "WorkFlowContainer",
            props: {
              dataPath: "Properties",
              moduleName: "MasterRP",
              updateUrl: "/csp/property/_update"
            }
          },
          searchButton: {
            componentPath: "Button",
            visible: !!findItem,
            gridDefination: {
              xs: 12,
              sm: 4,
              align: "right"
            },
            props: {
              variant: "contained",
              style: {
                color: "white",
                backgroundColor: "#fe7a51",
                borderColor:"#fe7a51",
                borderRadius: "2px",
                width: "50%",
                height: "48px",
              }
            },
            children: {
              buttonLabel: getLabel({
                labelName: "Notice Violation",
                labelKey: "RP_NOTICE_VIOLATION_BUTTON"
              })
            },
            onClickDefination: {
              action: "condition",
              callBack: (state, dispatch) => {
                dispatch(setRoute(`/rented-properties/notice-violation?tenantId=${getTenantId()}`));
              }
            }
          },
        propertyReviewDetails
      }
    }
  }
};
export default rentedPropertiesDetailPreview;

