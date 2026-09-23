import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { TrackOrderDetailDesktop } from "~/features/landing/track-order/TrackOrderDetailDesktop";
import { TrackOrderDetailMobile } from "~/features/landing/track-order/TrackOrderDetailMobile";

export default function TrackOrderDetailRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <TrackOrderDetailMobile /> : <TrackOrderDetailDesktop />;
}
