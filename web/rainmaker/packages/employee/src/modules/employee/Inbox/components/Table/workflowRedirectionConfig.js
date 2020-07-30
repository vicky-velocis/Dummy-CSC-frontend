export const getWFConfig = (module,businessService) => {
  console.log("module", module);
  
   if (businessService == "ADVERTISEMENTNOC" || businessService == "PETNOC" || businessService == "ROADCUTNOC" || businessService == "SELLMEATNOC") {
    if (businessService == "ROADCUTNOC") {
      return {
        INITIATED: "/egov-opms/roadcutnoc-search-preview",
        DEFAULT: "/egov-opms/roadcutnoc-search-preview",
      };
    }
    else if (businessService == "SELLMEATNOC") {
      return {
        INITIATED: "/egov-opms/sellmeatnoc-search-preview",
        DEFAULT: "/egov-opms/sellmeatnoc-search-preview",
      }
    } else if (businessService == "ADVERTISEMENTNOC") {
      return {
        INITIATED: "/egov-opms/advertisementnoc-search-preview",
        DEFAULT: "/egov-opms/advertisementnoc-search-preview",
      };
    } else if (businessService == "PETNOC") {
      return {
        INITIATED: "/egov-opms/search-preview",
        DEFAULT: "/egov-opms/search-preview",
      };
    }

  } else {
    switch (module.toUpperCase()) {
      case "TL-SERVICES":
        return {
          INITIATED: "/tradelicence/apply",
          DEFAULT: "/tradelicence/search-preview",
        };
      case "FIRENOC":
        return {
          INITIATED: "/fire-noc/apply",
          DEFAULT: "/fire-noc/search-preview",
        };
      case "BPA-SERVICES":
        return {
          INITIATED: "/egov-bpa/search-preview",
          DEFAULT: "/egov-bpa/search-preview",
        };
      case "BPAREG":
        return {
          DEFAULT: "/bpastakeholder/search-preview",
        };
      case "PT-SERVICES":
        return {
          INITIATED: "/property-tax/application-preview",
          DEFAULT: "/property-tax/application-preview",
        };
      case "PT":
        if (businessService == "PT.CREATE") {
          return {
            INITIATED: "/property-tax/application-preview",
            DEFAULT: "/property-tax/application-preview",
          };
        } else {
          return {
            INITIATED: "/pt-mutation/search-preview",
            DEFAULT: "/pt-mutation/search-preview",
          };
        }

    }
  }
  
  };
