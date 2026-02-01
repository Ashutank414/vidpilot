import * as React from "react"
import { cn } from "../../utils/cn"

const Tabs = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { defaultValue?: string; value?: string; onValueChange?: (value: string) => void }
>(({ className, defaultValue, value: controlledValue, onValueChange, children, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(defaultValue)
    const value = controlledValue !== undefined ? controlledValue : localValue
    const setValue = onValueChange || setLocalValue

    return (
        <div ref={ref} className={cn("", className)} {...props} data-state={value}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { value, setValue } as any)
                }
                return child
            })}
        </div>
    )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            className
        )}
        {...props}
    />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string; setValue?: (val: string) => void; contextValue?: string }
>(({ className, value, onClick, ...props }, ref) => {
    // Hack to get context value passed from parent Tabs map
    // In a real implementation we would use Context API
    const parentValue = (props as any).value as string
    const setParentValue = (props as any).setValue as (val: string) => void
    const isActive = parentValue === value

    return (
        <button
            ref={ref}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={(e) => {
                if (setParentValue) setParentValue(value)
                onClick?.(e)
            }}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isActive && "bg-background text-foreground shadow-sm",
                !isActive && "hover:bg-background/50 hover:text-foreground",
                className
            )}
            {...props}
        />
    )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
    const parentValue = (props as any).value as string
    if (parentValue !== value) return null

    return (
        <div
            ref={ref}
            role="tabpanel"
            className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
