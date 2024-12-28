import SearchCompanyComponent from "@components/common/SearchCompanyComponent.tsx";
import {Outlet} from "react-router-dom";
import StockInfoComponent from "@components/common/StockInfoComponent.tsx";

const Stock = () => {
    return (
        <>
            <StockInfoComponent/>
            <SearchCompanyComponent/>
            <Outlet />
        </>
    );
}

export default Stock;
