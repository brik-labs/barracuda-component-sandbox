import { forwardRef, type HTMLAttributes, type ThHTMLAttributes, type TdHTMLAttributes } from 'react';
import { cn } from '@shared/lib/utils';

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  function Table({ className, ...props }, ref) {
    return (
      <table
        ref={ref}
        className={cn('w-full text-sm [&>tbody>tr:last-child]:border-b-0', className)}
        {...props}
      />
    );
  }
);
Table.displayName = 'Table';

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader({ className, ...props }, ref) {
  return (
    <thead
      ref={ref}
      className={cn('bg-muted/50 border-b', className)}
      {...props}
    />
  );
});
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, ...props }, ref) {
  return (
    <tbody
      ref={ref}
      className={cn('bg-component', className)}
      {...props}
    />
  );
});
TableBody.displayName = 'TableBody';


const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement> & { selected?: boolean }>(
  function TableRow({ className, selected, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={cn(
          'border-b transition-colors hover:bg-muted/50',
          selected && 'bg-muted',
          className
        )}
        data-state={selected ? 'selected' : undefined}
        aria-selected={selected}
        {...props}
      />
    );
  }
);
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(function TableHead({ className, ...props }, ref) {
  return (
    <th
      ref={ref}
      className={cn(
        'h-10 px-3 py-2 text-left align-middle font-mono font-light text-xs uppercase whitespace-nowrap text-teal-300',
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  function TableCell({ className, ...props }, ref) {
    return (
      <td
        ref={ref}
        className={cn('px-3 py-2 align-middle text-sm', className)}
        {...props}
      />
    );
  }
);
TableCell.displayName = 'TableCell';

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter({ className, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
});
TableFooter.displayName = 'TableFooter';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
}
