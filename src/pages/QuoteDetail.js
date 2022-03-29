import React,{useEffect} from "react";
import { useParams,Route,Link,useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetail=()=>{
    const match=useRouteMatch();
    const params=useParams();

    const {quoteId}=params;

    const {sendRequest,status,data:loadedQuote,error}=useHttp(getSingleQuote,true);
    console.log(match);

    useEffect(()=>{
        sendRequest(quoteId);
    },[sendRequest,quoteId]);

    if(status==='pending'){
        return(
            <div className="centered">
                <LoadingSpinner/>
            </div>
        );
    }

    if(error){
        return <p className="centered" >{error}</p>;
    }

    if(!loadedQuote.text){
        return <p>No Quote Found</p>
    }

    return (
        <React.Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

            <Route path={match.path} exact >
                <div className="centered" >
                <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>


           

            {/* <h1>All Quote Detail page</h1>
            <p>{params.quoteId}</p> */}
            {/*Nested params  */}
            <Route path={`${match.path}/comments`} >  
                <Comments/>
            </Route>
        </React.Fragment>
    );
};
export default QuoteDetail;