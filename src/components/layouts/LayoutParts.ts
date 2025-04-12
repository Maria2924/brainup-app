import LayoutHeader from "./parts/Header";
import {LightContainer, Container, GrayContainer} from "./parts/LightContainer";

export const LayoutParts = {
    Header: LayoutHeader,
    Containers: {
        Light: LightContainer,
        Gray: GrayContainer,
        Default: Container
    }
}
