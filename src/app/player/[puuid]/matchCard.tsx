import { createStyles, Text, Avatar, Group, Flex } from '@mantine/core';
import { MatchInformation } from '@/interfaces';

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: '10px',
    marginBottom: '0.8em',
    padding: '0.8em 1em'
  },
  victory: {
    border: '4px solid #2B8A40',
    backgroundColor:'rgba(43, 138, 64, 0.7)'
  },
  defeat: {
    border: '4px solid #BD1910',
    backgroundColor:'rgba(133, 27, 27, 0.7)',
  }
}));

function formatTieme(seconds:number) {
  // Ensure seconds is a positive number
  if (typeof seconds !== 'number' || seconds < 0) {
    return "Invalid input";
  }

  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format the result as "mm:ss"
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

export default function MatchCard ({map, hasWon, KDA, agent, agentSrc, gameDate, gameDuration}:MatchInformation) {
  const { classes } = useStyles();
  return (

    <div className={`${classes.container} ${hasWon? classes.victory : classes.defeat}`}>
      <Group>
        <Text>Agent Played:</Text>
        <Flex>
          <Avatar src={agentSrc} alt={agent}/>
          <Text>{agent}</Text>
        </Flex>
      </Group>
      <Group>
        <Text>Map:</Text>
        <Text>{map}</Text>
      </Group>
      <Group>
        <Text>KDA:</Text>
        <Text>{KDA}</Text>
      </Group>
      <Text>{hasWon ? 'Victory' : 'Defeat'}</Text>
      <Group>
        <Text>Game played at:</Text>
        <Text>{gameDate}</Text>
      </Group>
      <Group>
        <Text>Game duration:</Text>
        <Text>{formatTieme(gameDuration)}</Text>
      </Group>        
    </div>
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