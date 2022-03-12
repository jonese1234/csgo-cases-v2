import { Grid } from "@mui/material";
import { Case, Skin } from "../models/case.model";
import SkinCard from "./SkinCard";

function CaseWrapper({data}: {data: Case}) {
    return (
        <Grid 
        container 
        spacing={{ xs: 2, md: 3 }} 
        columns={{ xs: 4, sm: 8, md: 12 }} 
        direction="row"
        justifyContent="space-evenly"
        alignItems="center">
            {
                data["skin values"].map((skin: Skin, index) => (
                    <Grid key={index} item xs="auto">
                        <SkinCard skin={skin}></SkinCard>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default CaseWrapper;