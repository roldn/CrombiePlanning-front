import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { List } from './issues/list';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import useToggle from './useToggle';
import Drawer from '@mui/material/Drawer/Drawer';
import { useTheme } from '@mui/material/styles';
import { Form } from './issues/form';
import { AppBar, Main, StyledButton } from './styles';
import ListIcon from '../../../assets/listIcon';
import Divider from '@mui/material/Divider';
import { Tooltip } from '@mui/material';
import useNotes from './issues/useNotes';

function Room(): JSX.Element {
  const toggle = useToggle();
  const theme = useTheme();
  const { notes, handleDelete, handleEdit } = useNotes();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        open={toggle.open}>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            sx={{ flexGrow: 2 }}
            component='div'>
            Crombie Planning
          </Typography>
          <Tooltip
            title={toggle.open ? 'Hide issues' : 'Show issues'}
            TransitionProps={{
              easing: 'step'
            }}
            componentsProps={{
              popper: { sx: { pointerEvents: 'none' } },
              tooltip: {
                sx: {
                  fontFamily: 'Verdana',
                  color: 'white',
                  backgroundColor: theme.palette.grey[800],
                  paddingY: 0.6,
                  paddingX: 0.9,
                  fontSize: 12.5
                }
              }
            }}>
            <StyledButton
              disableRipple
              color='primary'
              variant='outlined'
              onClick={() => toggle.toggleDrawer()}>
              <ListIcon
                viewBox='0 0 24 22'
                color={theme.palette.primary.main}
                width={24}
                height={22}
              />
            </StyledButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Main open={toggle.open}>//Room component</Main>
      <Drawer
        sx={{
          flexShrink: 0,
          width: 450,
          '& .MuiDrawer-paper': { width: 450, borderColor: 'white' }
        }}
        variant='persistent'
        anchor='right'
        open={toggle.open}>
        <Box
          sx={{
            padding: 3,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 1
          }}>
          <Typography
            sx={{
              flex: 1,
              fontWeight: 600
            }}>
            Issues
          </Typography>
          <Divider
            orientation='vertical'
            sx={{
              verticalAlign: 'center',
              width: 2,
              marginY: 'auto',
              height: 32,
              borderColor: 'none'
            }}
            flexItem
            color='grey'
          />
          <IconButton
            sx={{
              flexGrow: 0,
              width: 50,
              height: 50
            }}
            onClick={() => toggle.toggleDrawer(false)}>
            <Tooltip
              title='Hide issues'
              componentsProps={{
                tooltip: {
                  sx: {
                    fontFamily: 'Verdana',
                    color: 'white',
                    backgroundColor: theme.palette.grey[800],
                    paddingY: 0.6,
                    paddingX: 0.9,
                    fontSize: 12.5
                  }
                }
              }}>
              <CloseIcon
                sx={{
                  fontSize: 26
                }}
              />
            </Tooltip>
          </IconButton>
        </Box>
        <List
          notes={notes}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <Form />
      </Drawer>
    </Box>
  );
}

export default Room;
