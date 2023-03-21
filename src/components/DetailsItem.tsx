import { Box } from "@material-ui/core";

export function DetailItem({ itemName, itemValue } : { itemName: string, itemValue: string }) {
  return <Box pl={1.5} pr={1.5} style={{ justifyContent: 'space-between', display: 'flex', flexWrap: 'wrap', width: '100%', alignItems: 'center' }}>
    <div style={{ fontWeight: '400', fontSize: '14', display: 'flex', textAlign: 'left', wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '50%' }}>{itemName}</div>
    <div style={{ fontWeight: '400', fontSize: '14', textAlign: 'right', wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '50%' }}>{itemValue}</div>
  </Box>
}
