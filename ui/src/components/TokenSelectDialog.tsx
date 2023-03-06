import {
  Box,
  Card,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useCallback, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { DexTokens, TokenList } from "../utils/dex";
import { TokenInfo } from '@alephium/token-list'

const useStyles = makeStyles((theme) => ({
  flexTitle: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      flexGrow: 1,
      marginRight: theme.spacing(4),
    },
    "& > button": {
      marginRight: theme.spacing(-1),
    },
  },
  selectedCard: {
    "&:hover": {
      cursor: "pointer",
      boxShadow: "inset 0 0 50px 50px rgba(255, 255, 255, 0.1)",
    },
    display: "flex",
    alignItems: "center",
    height: 25,
    width: "max-content",
    padding: ".5rem",
    background:
      "linear-gradient(90deg, rgba(69,74,117,.2) 0%, rgba(138,146,178,.2) 33%, rgba(69,74,117,.5) 66%, rgba(98,104,143,.5) 100%), linear-gradient(45deg, rgba(153,69,255,.1) 0%, rgba(121,98,231,.1) 20%, rgba(0,209,140,.1) 100%)",
  },
  medium: {
    padding: "1.5rem 3rem",
  },
  style2: {
    background:
      "linear-gradient(270deg, rgba(69,74,117,.2) 0%, rgba(138,146,178,.2) 33%, rgba(69,74,117,.5) 66%, rgba(98,104,143,.5) 100%), linear-gradient(45deg, rgba(153,69,255,.1) 0%, rgba(121,98,231,.1) 20%, rgba(0,209,140,.1) 100%)",
  },
  selectedSymbol: {
    fontFamily: "Monospace",
    margin: ".5rem",
    fontSize: "15px"
  },
  icon: {
    height: 20,
    maxWidth: 20,
  },
}));

interface TokenSelectProps {
  dexTokens: DexTokens
  tokenId: string | undefined
  counterpart: string | undefined
  onChange: any
  style2?: boolean
  mediumSize?: boolean
  selectFromTokenList?: boolean
}

const TokenOptions = ({
  tokenInfo,
  onSelect,
  close,
}: {
  tokenInfo: TokenInfo;
  onSelect: (tokenInfo: TokenInfo) => void;
  close: () => void;
}) => {
  const classes = useStyles();

  const handleClick = useCallback(() => {
    onSelect(tokenInfo);
    close();
  }, [tokenInfo, onSelect, close]);

  return (
    <ListItem button onClick={handleClick} key={tokenInfo.id}>
      <ListItemIcon>
        <img
          src={tokenInfo.logoURI}
          alt={tokenInfo.name}
          className={classes.icon}
        />
      </ListItemIcon>
      <ListItemText>
        <Box fontFamily="Monospace" fontWeight="fontWeightMedium">{tokenInfo.id}</Box>
      </ListItemText>
    </ListItem>
  );
};

export default function TokenSelectDialog({
  dexTokens,
  tokenId,
  counterpart,
  onChange,
  style2,
  mediumSize,
  selectFromTokenList
}: TokenSelectProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [])
  const handleClick = useCallback(() => {
    setOpen(true)
  }, [])

  const info = selectFromTokenList
    ? TokenList.find((tokenInfo) => tokenInfo.id === tokenId)
    : dexTokens.tokenInfos.find((x) => x.id === tokenId)
  const availableTokens = selectFromTokenList
    ? TokenList.filter((tokenInfo) => tokenInfo.id !== tokenId && tokenInfo.id !== counterpart)
    : dexTokens.getAllowedTokenInfos(counterpart).filter((tokenInfo) => tokenInfo.id !== tokenId)
  const tokenOptions = availableTokens.map((token) =>
    <TokenOptions
      key={token.id}
      tokenInfo={token}
      onSelect={onChange}
      close={handleClose}
    />
  );

  const style = classes.selectedCard +
    (style2 ? ' ' + classes.style2 : '') +
    (mediumSize ? ' ' + classes.medium : '')
  return (
    <>
      <Card
        onClick={handleClick}
        raised
        className={style}
      >
        {info ? (
          <>
            <img
              src={info.logoURI}
              className={classes.icon}
              alt={info.name}
            />
            <Typography variant="h6" className={classes.selectedSymbol}>
              {info.name}
            </Typography>
          </>
          ): (
            <Typography variant="h6" className={classes.selectedSymbol}>
              Select token
            </Typography>
          )
        }
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth='md'>
        <DialogTitle>
          <div className={classes.flexTitle}>
            <div>Select token</div>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <List>{tokenOptions}</List>
      </Dialog>
    </>
  );
}
