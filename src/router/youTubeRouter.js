import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Body from "../components/Body"
import { MainContainer } from "../components/MainContainer"
import WatchPage from "../components/WatchPage"
import SearchResultPage from "../components/_searchpage/SearchResultPage"
import DemoPage from "../components/_demo/DemoPage"



export const youTubeRoutes =  createBrowserRouter([
    {
        path: "/",
        element: <Body/>,
        children: [
            {
                path: "/",
                element: <MainContainer/>
            },
            {
                path: "watch",
                element: <WatchPage/>
            },
            {

                path: 'search-result',
                element: <SearchResultPage/>
            },
            {

                path: 'demo',
                element: <DemoPage/>
            }
        
        ]
    },
])