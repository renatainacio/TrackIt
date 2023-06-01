import styled from "styled-components"

export default function Top() {
    return(
        <SCTop>
            <h1>TrackIt</h1>
            <img src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
        </SCTop>
    )
}

const SCTop = styled.div`
    position: absolute;
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 39px;
        line-height: 49px;
        color: #FFFFFF;
        margin-left:18px;
    }
    img {
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        margin-right: 18px;
    }
`