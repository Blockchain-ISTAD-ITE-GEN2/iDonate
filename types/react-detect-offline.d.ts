declare module "react-detect-offline" {
  import React from "react";

  export interface DetectorProps {
    render: (props: { online: boolean }) => React.ReactNode;
  }

  export const Detector: React.FC<DetectorProps>;
}
