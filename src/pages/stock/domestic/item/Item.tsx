import MenuComponent from "@components/common/MenuComponent.jsx";
import {Outlet} from "react-router-dom";
import {ContentBelowMenu, IncludeInformationDiv, OutletDiv} from "@assets/css/menu.jsx";

const Item = () => {

  const Menus = ['전체종목', '보유종목', '관심종목', '회사정보'];
  const Urls = ['entire', 'hold', 'watch', '/stock/article/read/2'];

  return (
    <IncludeInformationDiv $top={5}>
      <MenuComponent menus={Menus} urls={Urls}/>
      <ContentBelowMenu >
        <OutletDiv>
          <Outlet/>
        </OutletDiv>
      </ContentBelowMenu >
    </IncludeInformationDiv>
  );
}
export default Item;