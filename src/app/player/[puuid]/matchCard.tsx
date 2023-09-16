import { createStyles, Paper, Text, Avatar, Group } from '@mantine/core';
import { MatchInformation } from '@/interfaces';

const useStyles = createStyles((theme) => ({
  itemList: {
    marginBottom: '5px'
  },

  list: {
    width: '50vw',
    margin: '0 auto'
  },
}));


export default function MatchCard ({map, hasWon, KDA, agent, agentSrc, gameDate, gameDuration, playersImage, playersNick}:MatchInformation) {
  const { classes } = useStyles();
  return (

    <Paper>
      <Text>Map:</Text>
      <Text>{map}</Text>
      <Avatar src={playersImage} alt={playersNick}/>
      <Text>{hasWon ? 'Victory' : 'Defeat'}</Text>
      <Text>KDA:</Text>
      <Text>{KDA}</Text>
      <Text>Agent Played:</Text>
      <Group>
        <Avatar src={agentSrc} alt={agent}/>
        <Text>{agent}</Text>
      </Group>
        <Text>Game played at:</Text>
        <Text>{gameDate}</Text>
        <Text>Game duration:</Text>
        <Text>{gameDuration}</Text>
    </Paper>
  )
}

/* Map played
If the player’s team lost/win
Player’s KDA
Agent used by player
Date and time at which the match started
Match duration
Bonus (you may or may not add this):
Player’s card (image)
Agent’s image
 */