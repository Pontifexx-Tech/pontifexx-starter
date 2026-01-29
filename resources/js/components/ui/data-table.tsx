import * as React from 'react';
import { router } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

export interface FilterOption {
    value: string;
    label: string;
}

export interface Filter {
    key: string;
    label: string;
    options: FilterOption[];
}

export interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    pagination: PaginationData;
    filters?: Filter[];
    currentFilters: {
        search?: string;
        sort_by?: string;
        sort_direction?: string;
        per_page?: number;
        [key: string]: string | number | undefined;
    };
    baseUrl: string;
    searchPlaceholder?: string;
    onRowClick?: (item: T) => void;
    actions?: (item: T) => React.ReactNode;
}

export function DataTable<T extends { id: number | string }>({
    data,
    columns,
    pagination,
    filters = [],
    currentFilters,
    baseUrl,
    searchPlaceholder = 'Zoeken...',
    onRowClick,
    actions,
}: DataTableProps<T>) {
    const [searchValue, setSearchValue] = React.useState(
        currentFilters.search || ''
    );
    const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const updateFilters = React.useCallback(
        (newFilters: Record<string, string | number | undefined>) => {
            const params: Record<string, string | number> = {};

            // Merge current filters with new filters
            const merged = {
                ...currentFilters,
                ...newFilters,
                page: newFilters.page || 1,
            };

            // Only include non-empty values
            Object.entries(merged).forEach(([key, value]) => {
                if (value !== '' && value !== undefined && value !== null) {
                    params[key] = value;
                }
            });

            router.get(baseUrl, params, {
                preserveState: true,
                preserveScroll: true,
            });
        },
        [currentFilters, baseUrl]
    );

    const handleSearch = React.useCallback(
        (value: string) => {
            setSearchValue(value);

            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            searchTimeoutRef.current = setTimeout(() => {
                updateFilters({ search: value || undefined, page: 1 });
            }, 300);
        },
        [updateFilters]
    );

    const handleSort = React.useCallback(
        (column: string) => {
            const isCurrentSort = currentFilters.sort_by === column;
            const newDirection =
                isCurrentSort && currentFilters.sort_direction === 'asc'
                    ? 'desc'
                    : 'asc';

            updateFilters({
                sort_by: column,
                sort_direction: newDirection,
            });
        },
        [currentFilters.sort_by, currentFilters.sort_direction, updateFilters]
    );

    const handleFilterChange = React.useCallback(
        (key: string, value: string) => {
            updateFilters({ [key]: value || undefined, page: 1 });
        },
        [updateFilters]
    );

    const handlePerPageChange = React.useCallback(
        (value: string) => {
            updateFilters({ per_page: parseInt(value), page: 1 });
        },
        [updateFilters]
    );

    const handlePageChange = React.useCallback(
        (page: number) => {
            updateFilters({ page });
        },
        [updateFilters]
    );

    const clearFilters = React.useCallback(() => {
        setSearchValue('');
        router.get(baseUrl, {}, { preserveState: true });
    }, [baseUrl]);

    const hasActiveFilters =
        currentFilters.search ||
        filters.some((f) => currentFilters[f.key]);

    const getSortIcon = (column: string) => {
        if (currentFilters.sort_by !== column) {
            return <ArrowUpDown className="ml-2 h-4 w-4" />;
        }
        return currentFilters.sort_direction === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
        );
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Column Filters */}
                    {filters.map((filter) => (
                        <Select
                            key={filter.key}
                            value={String(currentFilters[filter.key] || '_all')}
                            onValueChange={(value) =>
                                handleFilterChange(filter.key, value === '_all' ? '' : value)
                            }
                        >
                            <SelectTrigger className="w-full sm:w-[150px]">
                                <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="_all">
                                    Alle {filter.label.toLowerCase()}
                                </SelectItem>
                                {filter.options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="h-9"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Wissen
                        </Button>
                    )}
                </div>

                {/* Per Page */}
                <Select
                    value={String(currentFilters.per_page || 10)}
                    onValueChange={handlePerPageChange}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={column.className}
                                >
                                    {column.sortable ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="-ml-3 h-8 data-[state=open]:bg-accent"
                                            onClick={() =>
                                                handleSort(column.key)
                                            }
                                        >
                                            {column.label}
                                            {getSortIcon(column.key)}
                                        </Button>
                                    ) : (
                                        column.label
                                    )}
                                </TableHead>
                            ))}
                            {actions && (
                                <TableHead className="w-[100px]">
                                    Acties
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        columns.length + (actions ? 1 : 0)
                                    }
                                    className="h-24 text-center"
                                >
                                    Geen resultaten gevonden.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className={cn(
                                        onRowClick && 'cursor-pointer'
                                    )}
                                    onClick={() => onRowClick?.(item)}
                                >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            className={column.className}
                                        >
                                            {column.render
                                                ? column.render(item)
                                                : (item as Record<string, unknown>)[
                                                      column.key
                                                  ] as React.ReactNode}
                                        </TableCell>
                                    ))}
                                    {actions && (
                                        <TableCell
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {actions(item)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                    {pagination.from && pagination.to ? (
                        <>
                            {pagination.from} tot {pagination.to} van{' '}
                            {pagination.total} resultaten
                        </>
                    ) : (
                        'Geen resultaten'
                    )}
                </p>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(1)}
                        disabled={pagination.current_page === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            handlePageChange(pagination.current_page - 1)
                        }
                        disabled={pagination.current_page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                        Pagina {pagination.current_page} van{' '}
                        {pagination.last_page}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            handlePageChange(pagination.current_page + 1)
                        }
                        disabled={
                            pagination.current_page === pagination.last_page
                        }
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(pagination.last_page)}
                        disabled={
                            pagination.current_page === pagination.last_page
                        }
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
