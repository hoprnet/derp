import styled from "@emotion/styled";

export const Location = styled.div`
  width: 100%;
  font-family: "Source Code Pro";
  font-style: normal;
  font-size: 14px;

  th {
    font-size: 16px;
  }
  th,
  td {
    padding: 8px;
  }
  pre {
    max-width: 480px;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }
  
  .hopr-table-header {
    background: linear-gradient(180deg, #0000b4 0.5%, #000050 100%);
    color: white;

    @media (min-width: 1040px) {
      .hopr-table-header-type {
        width: 76px;
      }

      .hopr-table-header-Timestamp {
        width: 157px;
      }

      .hopr-table-header-User-Agent {
        width: 208px;
      }

      .hopr-table-header-Method {
        width: 188px;
      }

      .hopr-table-header-Params {
      }
    }
  }

  .hopr-table-content-IP {
    overflow-wrap: anywhere;
  }

  table.network-settings {
    th {
      font-size: 14px;
      font-weight: 400;
    }
    th:first-of-type {
      font-weight: 600;
      width: 130px;
    }

    .rpc-url {
      overflow-wrap: anywhere;
    }
  }

  table.network-settings > tbody > tr:nth-of-type(1) > th {
    border-top: 0.1rem solid #e1e1e1;
  }

  @media (max-width: 699px) {
    td.no-padding-on-mobile {
      padding: 0;
    }
  }

  table.user-table {
    border: none;
  }

  table.user-table > tbody > tr > td {
    border-bottom: none;
  }

  .status-connected {
    margin-right: 8px;
    margin-bottom: -4px;
    width: 20px;
    height: 20px;
    color: darkgreen;
  }
`;
