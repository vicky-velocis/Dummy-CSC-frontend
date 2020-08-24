import {
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  ifUserRoleExists,download,
  downloadAcknowledgementFormForCitizen
} from "../../utils";
import set from "lodash/set";
import get from "lodash/get"

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const applicationSuccessFooter = (
  state,
  dispatch,
  applicationNumber,
  tenant,
  type
) => {
  const roleExists = ifUserRoleExists("CITIZEN");
  // const redirectionURL = roleExists ? "/tradelicense-citizen/home" : "/inbox";
  const redirectionURL = roleExists ? "/" : "/inbox";
  if (roleExists) {
    return getCommonApplyFooter({
      gotoHome: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            minWidth: "180px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          downloadReceiptButtonLabel: getLabel({
            labelName: "GO TO HOME",
            labelKey: "TL_COMMON_BUTTON_HOME"
          })
        },
        onClickDefination: {
          action: "page_change",
          path: redirectionURL
        },
      },
      downloadFormButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            minWidth: "180px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          downloadFormButtonLabel: getLabel({
            labelName: "DOWNLOAD CONFIRMATION FORM",
            labelKey: "TL_APPLICATION_BUTTON_DOWN_CONF"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: () => {
            debugger
            switch (type) {
              case "OWNERSHIPTRANSFERRP":
                const {
                  Owners, OwnersTemp
                } = state.screenConfiguration.preparedFinalObject;
                const documentsOT = OwnersTemp[0].reviewDocData;
                set(Owners[0], "additionalDetails.documents", documentsOT)
                downloadAcknowledgementFormForCitizen(Owners, OwnersTemp[0].estimateCardData, type, "ownership-transfer");
                break;
              case "DUPLICATECOPYOFALLOTMENTLETTERRP":
                const {
                  DuplicateCopyApplications, DuplicateTemp
                } = state.screenConfiguration.preparedFinalObject;
                let documents = DuplicateTemp[0].reviewDocData;
                set(DuplicateCopyApplications[0], "additionalDetails.documents", documents)
                downloadAcknowledgementFormForCitizen(DuplicateCopyApplications, DuplicateTemp[0].estimateCardData, type, "duplicate-copy");
                break;
              case "PERMISSIONTOMORTGAGE":
                const {
                  MortgageApplications, MortgageApplicationsTemp
                } = state.screenConfiguration.preparedFinalObject;
                let documentsMG = MortgageApplicationsTemp[0].reviewDocData;
                set(MortgageApplications[0], "additionalDetails.documents", documentsMG)
                downloadAcknowledgementFormForCitizen(MortgageApplications, MortgageApplicationsTemp[0].estimateCardData, type, "mortgage");
                break;

              default:
                const data = []
                // const ownersData = get(state.screenConfiguration.preparedFinalObject, "Owners", []);
                if(state.screenConfiguration.preparedFinalObject.hasOwnProperty('Owners')){
                  const Owners = get(state.screenConfiguration.preparedFinalObject, "Owners", []);
                  const receiptQueryString = [
                    { key: "consumerCodes", value: get(state.screenConfiguration.preparedFinalObject.Owners[0], "applicationNumber") },
                    { key: "tenantId", value: get(state.screenConfiguration.preparedFinalObject.Owners[0], "tenantId") }
                  ]
                  download(receiptQueryString, Owners,data, userInfo.name);
                }else{
                  const OwnersDC = get(state.screenConfiguration.preparedFinalObject, "DuplicateCopyApplications", []);
                  const receiptQueryString = [
                    { key: "consumerCodes", value: get(state.screenConfiguration.preparedFinalObject.DuplicateCopyApplications[0], "applicationNumber") },
                    { key: "tenantId", value: get(state.screenConfiguration.preparedFinalObject.DuplicateCopyApplications[0], "tenantId") }
                  ]
                  download(receiptQueryString, OwnersDC, data,userInfo.name);
                 
                }
                console.log(Owners)
                
                break;
            }
            console.log(type)
          }
        },
        visible: true
      },
      printFormButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            minWidth: "180px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          printFormButtonLabel: getLabel({
            labelName: "PRINT CONFIRMATION FORM",
            labelKey: "TL_APPLICATION_BUTTON_PRINT_CONF"
          })
        },
        // onClickDefination: {
        //   action: "condition",
        //   callBack: () => {
        //   const { Licenses,LicensesTemp } = state.screenConfiguration.preparedFinalObject;
        //   const documents = LicensesTemp[0].reviewDocData;
        //   set(Licenses[0],"additionalDetails.documents",documents)
        //   downloadAcknowledgementForm(Licenses, LicensesTemp[0].estimateCardData,'print');
        //   }
        // },
        visible: true
      }

    });
  } else {
    return getCommonApplyFooter({
      gotoHome: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            minWidth: "180px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          downloadReceiptButtonLabel: getLabel({
            labelName: "GO TO HOME",
            labelKey: "TL_COMMON_BUTTON_HOME"
          })
        },
        onClickDefination: {
          action: "page_change",
          path: redirectionURL
        },
      },
    });
  }
};
