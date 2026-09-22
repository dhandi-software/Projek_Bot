/**
 * Generates avatar initials from a full name.
 * Examples:
 * - "Dhandi Adam" -> "DA"
 * - "Budi Santoso Purwanto" -> "BP"
 * - "Dhandi" -> "DH"
 * - "" / undefined -> "U"
 */
export function getAvatarInitials(name?: string): string {
    if (!name || !name.trim()) return "U";

    const trimmed = name.trim();
    const words = trimmed.split(/\s+/).filter(Boolean);

    if (words.length === 1) {
        const single = words[0];
        return single.length >= 2 ? single.substring(0, 2).toUpperCase() : single.toUpperCase();
    }

    const firstChar = words[0].charAt(0);
    const lastChar = words[words.length - 1].charAt(0);
    return (firstChar + lastChar).toUpperCase();
}
