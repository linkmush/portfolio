import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { supportedLngs } from './config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SupportedLngs = typeof supportedLngs;
type LngCode = Extract<keyof SupportedLngs, string>;
type LngMeta = SupportedLngs[LngCode] & { flag?: string };

export type LanguagePickerProps = {
  readonly iconOnly?: boolean;
  readonly label?: string;
  readonly showFlags?: boolean;
  readonly className?: string;
  readonly persist?: boolean;
  readonly ariaLabel?: string;
  readonly value?: LngCode;
  readonly onChange?: (lng: LngCode) => void;
};

const normalize = (lng?: string): LngCode =>
  ((lng?.split?.('-')[0] as LngCode) ?? ('en' as LngCode));

export function LanguagePicker({
  iconOnly = true,
  label,
  showFlags = true,
  className = '',
  persist = true,
  ariaLabel = 'Change language',
  value,
  onChange,
}: LanguagePickerProps) {
  const { i18n } = useTranslation();

  const initial = React.useMemo<LngCode>(() => {
    const fromI18n = normalize(i18n.resolvedLanguage || i18n.language);
    let fromStorage: LngCode | undefined;
    if (typeof window !== 'undefined') {
      try {
        fromStorage = normalize(localStorage.getItem('lng') || undefined);
      } catch (err) {
        console.error('Error reading language from localStorage:', err);
      }
    }
    return (value ?? fromStorage ?? fromI18n ?? 'en') as LngCode;
  }, [i18n.language, i18n.resolvedLanguage, value]);

  const [internal, setInternal] = React.useState<LngCode>(initial);

  React.useEffect(() => {
    const next = normalize(i18n.resolvedLanguage || i18n.language);
    if ((value ?? internal) !== next) setInternal(next);
  }, [i18n.language, i18n.resolvedLanguage, internal, value]);

  React.useEffect(() => {
    if (!persist) return;
    const handler = (lng: string) => {
      try {
        localStorage.setItem('lng', normalize(lng));
      } catch (err) {
        console.error('Error saving language to localStorage:', err);
      }
    };
    i18n.on('languageChanged', handler);
    return () => {
      i18n.off('languageChanged', handler);
    };
  }, [i18n, persist]);

  const langs = supportedLngs as Record<LngCode, LngMeta>;
  const current = (value ?? internal) as LngCode;

  const handleSelect = React.useCallback(
    (next: string) => {
      const code = next as LngCode;
      if (!onChange) setInternal(code);
      i18n.changeLanguage(code);
      onChange?.(code);
      if (persist) {
        try {
          localStorage.setItem('lng', code);
        } catch (err) {
          console.error('Error writing selected language to localStorage:', err);
        }
      }
    },
    [i18n, onChange, persist]
  );

const triggerBase =
  'inline-flex items-center gap-2 rounded-md h-9 px-3 text-sm font-semibold ' +
  'text-[#9B5DE5] transition duration-300 ' +
  'hover:text-[#F15BB5] drop-shadow-[0_0_6px_#9B5DE5] ' +
  'bg-transparent border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 ' +
  'data-[state=open]:text-[#F15BB5]';

  const currentLabel = label ?? langs[current]?.name ?? current.toUpperCase();

  return (
    <Select value={current} onValueChange={handleSelect}>
      <SelectTrigger aria-label={ariaLabel} className={`${triggerBase} ${className}`}>
        <Languages className="h-4 w-4 text-[#9B5DE5] group-hover:text-[#F15BB5]" aria-hidden="true" />
        {iconOnly ? (
          <>
            <span className="sr-only">{currentLabel}</span>
            <SelectValue className="sr-only" />
          </>
        ) : (
          <span className="truncate">{currentLabel}</span>
        )}
      </SelectTrigger>
      <SelectContent
        className="bg-[#0a0a0f] border border-[#9B5DE5]/40 rounded-md shadow-lg 
                  text-white focus:outline-none focus-visible:outline-none 
                  ring-0 ring-offset-0"
      >
        {Object.entries(langs).map(([code, meta]) => (
          <SelectItem
            key={code}
            value={code}
            className="cursor-pointer px-3 py-2 text-sm text-white 
                      hover:bg-gradient-to-r hover:from-[#9B5DE5]/20 hover:to-[#F15BB5]/20 
                      hover:text-[#F15BB5] 
                      focus:bg-gradient-to-r focus:from-[#9B5DE5]/30 focus:to-[#F15BB5]/30
                      data-[state=checked]:text-[#F15BB5] data-[state=checked]:font-semibold"
          >
            <span className="flex items-center gap-2">
              {showFlags && meta.flag && <span aria-hidden="true">{meta.flag}</span>}
              <span className="truncate">{meta.name ?? (code as string).toUpperCase()}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
