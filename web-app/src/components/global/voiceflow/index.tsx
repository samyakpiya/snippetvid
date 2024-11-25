"use client";

import React from "react";
import { useEffect } from "react";
import { LoadVoiceFlowAgent } from "../../../lib/voiceflow";

const VoiceFlowAgent = () => {
  useEffect(() => {
    LoadVoiceFlowAgent();
  }, []);

  return <></>;
};

export default VoiceFlowAgent;
