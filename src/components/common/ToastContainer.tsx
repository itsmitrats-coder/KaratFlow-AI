import React from 'react';
import { useKaratFlow } from '../../context/KaratFlowContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useKaratFlow();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = 'border-[#D6B875]/40';
        let bgIcon = <CheckCircle2 className="w-5 h-5 text-[#29372F]" />;
        let iconBg = 'bg-[#29372F]/10';

        if (toast.type === 'warning') {
          borderClass = 'border-amber-400/50';
          bgIcon = <AlertTriangle className="w-5 h-5 text-amber-600" />;
          iconBg = 'bg-amber-100';
        } else if (toast.type === 'error') {
          borderClass = 'border-red-400/50';
          bgIcon = <XCircle className="w-5 h-5 text-red-600" />;
          iconBg = 'bg-red-100';
        } else if (toast.type === 'info') {
          borderClass = 'border-[#D6B875]/30';
          bgIcon = <Info className="w-5 h-5 text-[#C5A253]" />;
          iconBg = 'bg-[#FAF5EA]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border ${borderClass} transition-all duration-300 transform translate-y-0 opacity-100`}
            role="alert"
          >
            <div className={`p-2 rounded-lg ${iconBg} shrink-0 mt-0.5`}>
              {bgIcon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-[#111111] truncate">{toast.title}</h4>
                <span className="text-[11px] text-[#858585] font-mono shrink-0">{toast.timestamp}</span>
              </div>
              <p className="text-xs text-[#555555] mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-md text-[#858585] hover:text-[#111111] hover:bg-black/5 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
