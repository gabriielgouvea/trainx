'use client'

import * as React from "react"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Custom Select (For fixed options like State, Civil Status) ---

interface Option {
  label: string
  value: string
}

interface CustomSelectProps {
  options: Option[] | string[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  disabled = false,
  className
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Normalize options to string[] or Option[]
  const normalizeOptions = React.useMemo(() => {
    return options.map(opt => typeof opt === 'string' ? { label: opt, value: opt } : opt)
  }, [options])

  const selectedLabel = normalizeOptions.find(opt => opt.value === value)?.label

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-neutral-800 bg-tx-black px-3 py-2 text-sm text-white ring-offset-tx-black placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-neutral-400"
        )}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-md border border-neutral-800 bg-tx-black py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {normalizeOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={cn(
                "relative cursor-default select-none py-2 pl-3 pr-9 text-sm text-neutral-100 hover:bg-neutral-800",
                value === option.value && "bg-tx-dark font-medium text-tx-red"
              )}
            >
              <span className="block truncate">{option.label}</span>
              {value === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-tx-red">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </div>
          ))}
          {normalizeOptions.length === 0 && (
            <div className="p-2 text-sm text-neutral-400">Nenhuma opÃ§Ã£o.</div>
          )}
        </div>
      )}
    </div>
  )
}

// --- Custom Combobox (For Searchable/Free text inputs like City) ---

interface CustomComboboxProps {
  options: string[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function CustomCombobox({
  options,
  value = "",
  onChange,
  placeholder = "Digite...",
  disabled = false,
  className
}: CustomComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // Filter options based on current value (input)
  const filteredOptions = React.useMemo(() => {
    if (!value) return options;
    const lower = value.toLowerCase()
    return options.filter(opt => opt.toLowerCase().includes(lower))
  }, [options, value])

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => {
            onChange(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="flex h-10 w-full rounded-md border border-neutral-800 bg-tx-black px-3 py-2 text-sm text-white ring-offset-tx-black placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-md border border-neutral-800 bg-tx-black py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredOptions.map((opt, i) => (
             <div
              key={i}
              onClick={() => {
                onChange(opt)
                setIsOpen(false)
              }}
              className="relative cursor-default select-none py-2 pl-3 pr-4 text-sm text-neutral-100 hover:bg-neutral-800"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

