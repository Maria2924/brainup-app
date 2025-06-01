export default function Logo({ width = 48, height = 48, className }: { width?: number, height?: number, className?: string }) {
    return (
        <img
            src={"/icons/logo/brainup-32x32-4x.png"}
            height={width}
            width={height}
            alt={"Logo"}
            className={className}
        />
    )
}
