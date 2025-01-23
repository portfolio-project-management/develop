import AppBarCustom from "./modules/components/AppBarCustom";

export default function Main() {
    return(
        <div style={{
            height:1300,
            backgroundImage:"url(/static/images/main_bg.jpg)",
            backgroundSize:'cover' 
        }}>
            <AppBarCustom></AppBarCustom>
        </div>
    );
}   
