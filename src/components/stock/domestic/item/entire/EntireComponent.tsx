import { useState} from 'react';
import useCustomMove from "@hooks/useCustomMove.ts";
import {WatchListContainer, StockList} from "@assets/css/item.tsx";
import StockItem from "./StockItem.tsx";
import useCompanyData from "@hooks/useCompanyData.ts";
import {ContentBottom} from "@assets/css/content.tsx";

function EntireComponent() {

    const [showChangePrice, setShowChangePrice] = useState(false);
    const {moveToRead} = useCustomMove();

    const {data: companies, isLoading, isError} = useCompanyData(2, 15);

    const companiesList = companies || [];

    return (
        <WatchListContainer>
            <StockList>
                {isLoading ? (
                    <div></div>
                ) : isError ? (
                    <div>Error fetching data</div>
                ) : (
                    companiesList.map((company) => (
                        <StockItem
                            key={company.companyId}
                            company={company}
                            setShowChangePrice={setShowChangePrice}
                            showChangePrice={showChangePrice}
                            onclick={() => moveToRead(company.companyId)}
                        />
                    ))
                )}
            </StockList>
            <ContentBottom/>
        </WatchListContainer>
    );
}

export default EntireComponent;
