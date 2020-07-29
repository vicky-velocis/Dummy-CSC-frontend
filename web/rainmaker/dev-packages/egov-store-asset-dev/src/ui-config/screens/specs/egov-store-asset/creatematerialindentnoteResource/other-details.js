import {
    getCommonCard,
    getCommonGrayCard,
    getCommonTitle,
    getCommonSubHeader,
    getTextField,
    getSelectField,
    getCommonContainer,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
 
  
  export const otherDetails = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Other Details",
        labelKey: "STORE_MATERIAL_OTHER_DETAILS"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
  
    View1: getCommonGrayCard({
      header1: getCommonTitle(
        {
          labelName: "Purchasing Information",
          labelKey: "STORE_MATERIAL_PURCHASING_INFORMATION"
        },
        {
          style: {
            marginBottom: 18
          }
        }
      ),
      ApprovalInformationContainer: getCommonContainer({
        PurchaseUOMName: {
          ...getSelectField({
            label: {
              labelName: "Purchase UOM  Name",
              labelKey: "STORE_MATERIAL_PURCHASE_UOM_NAME"
            },
            placeholder: {
              labelName: "Select Purchase UOM  Name",
              labelKey: "STORE_MATERIAL_PURCHASE_UOM_NAME_SELECT"
            },
            required: true,
           
            jsonPath: "materials[0].purchaseUom.code",
            sourceJsonPath: "createScreenMdmsData.common-masters.UOM",
          props: {
            optionLabel: "code",
            optionValue: "name"
          },
          })
        },
        ExpenseAccountCode: {
          ...getSelectField({
            label: {
              labelName: "Expense Account Code",
              labelKey: "STORE_MATERIAL_EXPENSE_ACCOUNT_CODE"
            },
            placeholder: {
              labelName: "Selet Expense Account Code",
              labelKey: "STORE_MATERIAL_EXPENSE_ACCOUNT_CODE_SELECT"
            },
            required: false,
            pattern: getPattern("Name") || null,
            jsonPath: "materials[0].expenseAccount.glCode"
          })
        },  
       
      }), 
    }),

    
  });
  

  