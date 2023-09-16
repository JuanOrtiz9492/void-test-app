import { createStyles, Avatar, Text, Grid, Badge } from '@mantine/core';
import { PlayerCardInterface } from '@/interfaces';


const useStyles = createStyles((theme) => ({
  groupStyle: {
    borderColor: "white"
  },
  textStyles: {
    color:"white"
  }
}));


export default function PlayerCard ({rankPosition, nickName, raiting, wins, banStatus }: PlayerCardInterface) {
  const { classes } = useStyles();
  return (
  <Grid styles="border-color: 'white'">
    <Grid.Col span={1}>
      <Text className={classes.textStyles}>{rankPosition}</Text>
    </Grid.Col>
    <Grid.Col span={1}>
      <Avatar/>  
    </Grid.Col>
    <Grid.Col span={3}>
      <Text className={classes.textStyles}>{nickName}</Text>  
    </Grid.Col>
    <Grid.Col span={1}>
      <Text className={classes.textStyles}>{raiting}</Text>  
    </Grid.Col>
    <Grid.Col span={1}>
      <Text className={classes.textStyles}>{wins}</Text>  
    </Grid.Col>
    <Grid.Col span={2}>
      <Badge color={banStatus? 'red' : 'teal'}>{banStatus ? 'Banned' : 'Active'}</Badge>  
    </Grid.Col>     
  </Grid>)
}

/* function Demo() {
  return (
    <Grid>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
    </Grid>
  );
} */

/* IsAnonymized: false
IsBanned: false
PlayerCardID: "38defae8-4b79-f5cc-09c1-ceb5e109c4c9"
TitleID: "129190d4-42fa-4e79-75e3-ffb5679d1dc2"
competitiveTier: 27
gameName: "M80 Zander"
leaderboardRank: 1
numberOfWins:92
puuid: "46831b96-eec3-528b-85b2-7c18cfce1fbe"
rankedRating: 1101
tagLine: "swag" */