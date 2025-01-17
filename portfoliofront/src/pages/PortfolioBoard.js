import { useEffect, useState } from "react";
import { SERVER_URL } from "../Link";

export default function PortfolioBoard() {

    const [ portfolioList, setPortfolioList ] = useState([{}]);

    useEffect(() => {
        fetch(SERVER_URL + "portfolioboard/get")
        .then(response => response.json())
        .then(data => {
            setPortfolioList(data);
        })
        .catch(error => console.log(error))
    })

    return(
        <div>
            
        </div>
    );
}