"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { addToSessionHistory } from "@/lib/actions/companion.actions";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isSpeaking]);

  useEffect(() => {
    // Scroll to bottom of transcript when new messages arrive
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop =
        transcriptContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => {
      console.log("Error", error);
      toast.error(error.message[0] || "Failed to create call");
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <section className="flex flex-col w-full max-w-7xl h-[70vh] bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 shadow-xl">
      {/* Main Content Area  */}
      <section className="flex gap-8 max-sm:flex-col flex-1 mb-6 w-full">
        {/* Companion Section */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <div className="relative w-40 h-40 mb-4">
            <div
              className={cn(
                "absolute inset-0 transition-all duration-500 rounded-2xl flex items-center justify-center",
                callStatus === CallStatus.ACTIVE
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-2 ring-blue-500/30"
                  : "bg-slate-700/50",
                callStatus === CallStatus.CONNECTING &&
                  "animate-pulse bg-blue-500/20"
              )}
              style={{
                backgroundColor:
                  callStatus !== CallStatus.ACTIVE
                    ? getSubjectColor(subject) + "40"
                    : "",
              }}
            >
              <div
                className={cn(
                  "absolute transition-opacity duration-500",
                  callStatus === CallStatus.FINISHED ||
                    callStatus === CallStatus.INACTIVE
                    ? "opacity-100"
                    : "opacity-0",
                  callStatus === CallStatus.CONNECTING && "opacity-100"
                )}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={100}
                  height={100}
                  className="filter brightness-0 invert opacity-80"
                />
              </div>

              <div
                className={cn(
                  "absolute transition-opacity duration-500",
                  callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                  className="w-32 h-32"
                />
              </div>
            </div>
          </div>
          <p className="font-bold text-2xl text-white text-center mb-1 truncate w-full">
            {name}
          </p>
          <p className="text-slate-400 text-sm capitalize">
            {subject} Companion
          </p>
        </div>

        {/* User Section */}
        <div className="flex flex-col items-center flex-1 gap-4 min-w-0">
          <div className="flex flex-col items-center w-full">
            <div className="w-24 h-24 rounded-2xl bg-slate-700/50 border border-slate-600/50 mb-3 overflow-hidden">
              <Image
                src={userImage}
                alt={userName}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-bold text-xl text-white truncate w-full text-center">
              {userName}
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 w-full justify-center",
                isMuted
                  ? "bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                  : "bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30",
                callStatus !== CallStatus.ACTIVE &&
                  "opacity-50 cursor-not-allowed"
              )}
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              <span className="text-sm font-medium">
                {isMuted ? "Mic Off" : "Mic On"}
              </span>
            </button>

            <button
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 w-full justify-center",
                callStatus === CallStatus.ACTIVE
                  ? "bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-red-500/25"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25",
                callStatus === CallStatus.CONNECTING &&
                  "animate-pulse from-blue-400 to-purple-400"
              )}
              onClick={
                callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
              }
            >
              {callStatus === CallStatus.ACTIVE ? (
                <>
                  <PhoneOff size={20} />
                  End Session
                </>
              ) : callStatus === CallStatus.CONNECTING ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Phone size={20} />
                  Start Session
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Transcript Section */}
      <section className="flex-1 bg-slate-900/50 rounded-xl border border-slate-700/30 overflow-hidden w-full">
        <div className="flex items-center gap-2 p-4 border-b border-slate-700/30 bg-slate-800/50">
          <MessageSquare size={18} className="text-blue-400" />
          <h3 className="text-slate-300 font-semibold">Conversation</h3>
        </div>

        <div
          ref={transcriptContainerRef}
          className="h-48 overflow-y-auto p-4 space-y-3 no-scrollbar"
        >
          {messages.length === 0 ? (
            <div className="text-center text-slate-500 py-8 h-full flex items-center justify-center">
              <div>
                <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                <p>Your conversation will appear here...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message, index) => {
                if (message.role === "assistant") {
                  return (
                    <div key={index} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 text-sm font-bold">
                          {name.charAt(0)}
                        </span>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-3 max-w-[70%]">
                        <p className="text-white text-sm">{message.content}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="flex gap-3 justify-end">
                      <div className="bg-blue-500/20 rounded-xl p-3 max-w-[70%]">
                        <p className="text-white text-sm">{message.content}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-slate-400" />
                      </div>
                    </div>
                  );
                }
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default CompanionComponent;
