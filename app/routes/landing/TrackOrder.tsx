import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { TrackOrderDesktop } from "~/features/landing/track-order/TrackOrderDesktop";
import { TrackOrderMobile } from "~/features/landing/track-order/TrackOrderMobile";

export default function TrackOrderRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <TrackOrderMobile /> : <TrackOrderDesktop />;
}
