import React from "react";
import styled from "@emotion/styled";

//mui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SFormControl = styled(FormControl)`
  margin-bottom: 16px;
  margin-top: 24px;
  label {
    font-size: 17px;
  }
  .MuiOutlinedInput-root {
    font-size: 17px;
  }
`

function Section(props) {
    return (
        <SFormControl size="small" >
            <InputLabel id="select-small">RPC</InputLabel>
            <Select
                labelId="select-small"
                id="select-small"
                value={props.value}
                onChange={props.onChange}
                label="RPC"
            >
                <MenuItem value={'ETH'}>ETH Mainnet</MenuItem>
                <MenuItem value={'xDai'}>Gnosis Chain</MenuItem>
                <MenuItem value={'arbitrum'}>Arbitrum One</MenuItem>
                <MenuItem value={'avalanche'}>Avalanche Mainnet</MenuItem>
                <MenuItem value={'neonlabs'}>NeonLabs Solana Devnet Proxy</MenuItem>
            </Select>
        </SFormControl>
    );
}

export default Section;
