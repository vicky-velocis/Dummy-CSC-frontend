import {
    getCommonCard,
    getTextField,
    getCommonContainer,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  export const totalPOValue = getCommonCard({
   
    totalValueContainer: getCommonContainer({  
      totalPOValue: {
        ...getTextField({
          label: {
            labelName: "Total PO Value",
            labelKey: "STORE_PURCHASE_ORDER_TOTAL_PO_VALUE"
          },
          props: {
            disabled: true
          },
          jsonPath: "purchaseOrders[0].totalPOValue"
        })
      },
    })
  });
  
  