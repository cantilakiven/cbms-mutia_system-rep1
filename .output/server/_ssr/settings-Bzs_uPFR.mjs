import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { logo } from "./router-n4bYjCIt.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { L as LockKeyhole, K as KeyRound, h as CircleCheck, S as ShieldCheck, f as CloudDownload, R as RefreshCw } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/zod.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
function SettingsPage() {
  const [configured, setConfigured] = reactExports.useState(false);
  const [currentPin, setCurrentPin] = reactExports.useState("");
  const [newPin, setNewPin] = reactExports.useState("");
  const [confirmPin, setConfirmPin] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [appVersion, setAppVersion] = reactExports.useState("—");
  const [checkingUpdate, setCheckingUpdate] = reactExports.useState(false);
  const [updateMessage, setUpdateMessage] = reactExports.useState("");
  reactExports.useEffect(() => {
    void (async () => {
      const state = await window.electronStore?.getAuthState?.();
      setConfigured(Boolean(state?.configured));
      const version = await window.electronApp?.getVersion?.();
      if (version) setAppVersion(version);
    })();
  }, []);
  const checkForUpdates = async () => {
    setCheckingUpdate(true);
    setUpdateMessage("");
    try {
      const result = await window.electronUpdater?.checkForUpdates?.();
      if (!result?.ok) {
        setUpdateMessage(result?.message || "Update checks are available in the installed desktop application.");
      } else if (result.state === "up-to-date") {
        setUpdateMessage(`You are using the latest installed version (${result.currentVersion || appVersion}).`);
      } else if (result.state === "available") {
        setUpdateMessage(`A newer version (${result.version}) is available. Downloading in the background.`);
      } else {
        setUpdateMessage(`Update check completed for version ${result.currentVersion || appVersion}.`);
      }
    } catch (error) {
      setUpdateMessage(error instanceof Error ? error.message : "Unable to check for updates.");
    } finally {
      setCheckingUpdate(false);
    }
  };
  const save = async () => {
    setMessage("");
    if (!/^\d{6}$/.test(newPin)) return setMessage("Enter a new 6-digit PIN using numbers only.");
    if (newPin !== confirmPin) return setMessage("The new PIN and confirmation do not match.");
    if (configured && !/^\d{6}$/.test(currentPin)) return setMessage("Enter your current 6-digit PIN first.");
    setSaving(true);
    try {
      const result = await window.electronStore?.setLoginPin?.(newPin, currentPin);
      if (!result?.ok) return setMessage(result?.error || "Unable to save PIN.");
      setConfigured(true);
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
      setMessage("PIN updated successfully. The new PIN is required the next time the system starts.");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "CBMS Insights", className: "h-14 w-14 rounded-2xl border border-border bg-background p-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[0.18em] text-primary", children: "System security" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-2xl font-bold", children: "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Protect access to this CBMS desktop system with a private 6-digit PIN." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Login PIN" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: configured ? "A login PIN is active. Enter the current PIN to change it." : "No login PIN is set yet. Set one to enable the secure login screen." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 sm:grid-cols-2", children: [
        configured && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold", children: [
          "Current PIN",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentPin, onChange: (e) => setCurrentPin(e.target.value.replace(/\D/g, "").slice(0, 6)), inputMode: "numeric", maxLength: 6, type: "password", placeholder: "••••••", className: "mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-3 tracking-[0.35em] outline-none focus:ring-2 focus:ring-primary/30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold", children: [
          "New 6-digit PIN",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newPin, onChange: (e) => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 6)), inputMode: "numeric", maxLength: 6, type: "password", placeholder: "••••••", className: "mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-3 tracking-[0.35em] outline-none focus:ring-2 focus:ring-primary/30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold", children: [
          "Confirm PIN",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: confirmPin, onChange: (e) => setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 6)), inputMode: "numeric", maxLength: 6, type: "password", placeholder: "••••••", className: "mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-3 tracking-[0.35em] outline-none focus:ring-2 focus:ring-primary/30" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => void save(), disabled: saving, className: "mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-4 w-4" }),
        saving ? "Saving…" : configured ? "Change PIN" : "Set PIN"
      ] }),
      message && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-bold text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }),
        " Security behavior"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "The PIN is stored as a salted, memory-hard hash in the application's local settings. The raw PIN is never written to disk. After a PIN is configured, every fresh application launch shows only the secure PIN login screen." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[0.18em] text-primary", children: "Update center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-1 font-display text-lg font-bold", children: [
            "CBMS Insights ",
            appVersion !== "—" ? `v${appVersion}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Use the packaged desktop application to check GitHub for a newer release. Development mode does not install updates." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void checkForUpdates(), disabled: checkingUpdate, className: "mt-4 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/10 disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-4 w-4 ${checkingUpdate ? "animate-spin" : ""}` }),
        checkingUpdate ? "Checking…" : "Check for updates"
      ] }),
      updateMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground", children: updateMessage })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[0.18em] text-primary", children: "Credits" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-semibold text-foreground", children: [
        "Developed by",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "text-primary hover:underline", href: "https://www.facebook.com/hello.kwekwe", target: "_blank", rel: "noreferrer", children: "Kiven Cantila" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "System Reviewer 1:" }),
          " Clifford Kevin Bohol"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "System Reviewer 2:" }),
          " Fredrich Cabasag"
        ] })
      ] })
    ] })
  ] });
}
export {
  SettingsPage as component
};
