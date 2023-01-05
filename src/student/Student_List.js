import React from "react";
import Card from "@mui/joy/Card";
import Typography from '@mui/joy/Typography';
import { Grid } from '@mui/material';
import { CardContent,CardActions,Button , Container} from '@mui/material';

export default function Student_List_Page() {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    return(
        <Container sx={{ py: 8, shadows : 1}} maxWidth="md" >
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  style={{ border: "0.5px solid grey" }}
                >
                  {/* <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" textAlign={'center'} harf>214202 </Typography>
                    <Typography textAlign={'center'}> มนุษย์กับสังคมและสิ่งแวดล้อม </Typography>
                    <Typography textAlign={'center'}> MAN, SOCIETY AND ENVIRONMENT </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent:'center'}}>
                    <Button size="small">★★★☆☆ (3)</Button>
                    <Button size="small">Comment (2) </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

    );
}