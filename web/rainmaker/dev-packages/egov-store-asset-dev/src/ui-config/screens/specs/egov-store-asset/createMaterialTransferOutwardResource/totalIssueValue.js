import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getCommonContainer,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  export const totalIssueValue = getCommonCard({
   
    totalValueContainer: getCommonContainer({  
      totalValue: {
        ...getTextField({
          label: {
            labelName: "Total Issue Value",
            labelKey: "STORE_MTON_TOTAL_ISSUE_VALUE"
          },
          props: {
            disabled: true
          },
          jsonPath: "purchaseOrders[0].totalValue"
        })
      },
    })
  });
  
  