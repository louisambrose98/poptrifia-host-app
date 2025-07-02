# DataTable Component - Best Practices

## 🎯 **Why This Approach is Better**

### **Problems with Direct Component Modification:**

- ❌ Hard to maintain and update
- ❌ Difficult to test individual parts
- ❌ No reusability across different use cases
- ❌ Mixed concerns (styling + logic + presentation)
- ❌ Hard to customize specific parts

### **Benefits of Composition Pattern:**

- ✅ **Modular**: Each part can be customized independently
- ✅ **Reusable**: Components can be mixed and matched
- ✅ **Testable**: Each component can be tested in isolation
- ✅ **Maintainable**: Changes to one part don't affect others
- ✅ **Flexible**: Multiple ways to use the same components

## 🏗️ **Component Architecture**

```
DataTable/
├── index.ts              # Main exports
├── types.ts              # TypeScript interfaces
├── DataTable.tsx         # Main component + sub-components
├── examples/             # Usage examples
│   └── CustomQuestionTable.tsx
└── README.md            # This file
```

## 🚀 **Usage Patterns**

### **1. Simple Usage (Recommended for most cases)**

```tsx
<DataTable
  columns={columns}
  data={data}
  pageSize={10}
  total={data.length}
  title="Questions"
  description="Manage your questions"
/>
```

### **2. Custom Header**

```tsx
<DataTable
  columns={columns}
  data={data}
  pageSize={10}
  total={data.length}
  header={
    <div className="flex justify-between items-center">
      <h3>Custom Header</h3>
      <Button>Add New</Button>
    </div>
  }
/>
```

### **3. Custom Empty State**

```tsx
<DataTable
  columns={columns}
  data={data}
  pageSize={10}
  total={data.length}
  emptyState={
    <div className="text-center py-8">
      <h4>No data found</h4>
      <p>Create your first item to get started</p>
    </div>
  }
/>
```

### **4. Full Composition (Maximum flexibility)**

```tsx
<div className="space-y-4">
  <DataTableHeader title="Questions" description="Manage questions">
    <Button>Add New</Button>
  </DataTableHeader>

  <DataTableContainer>
    <DataTableContent
      columns={columns}
      data={data}
      emptyState={<CustomEmptyState />}
    />
  </DataTableContainer>

  <DataTablePagination
    page={page}
    totalPages={totalPages}
    total={total}
    pageSize={pageSize}
    onPageChange={setPage}
  />
</div>
```

## 🎨 **Styling Best Practices**

### **1. Use CSS Variables for Theme Consistency**

```css
:root {
  --table-border: rgb(230, 231, 242);
  --table-header-bg: rgb(242, 242, 248);
  --table-hover: rgb(242, 242, 248);
}
```

### **2. Component-Level Styling**

```tsx
// Good: Component-specific styles
function CustomTableHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-t-lg">
      <h3 className="text-lg font-semibold">Custom Header</h3>
    </div>
  );
}
```

### **3. Utility-First Approach**

```tsx
// Good: Using Tailwind utilities
<div className="rounded-lg border bg-card shadow-sm">
  <table className="w-full">
    <thead className="bg-muted/30">
      <tr className="border-b">{/* ... */}</tr>
    </thead>
  </table>
</div>
```

## 🔧 **Customization Examples**

### **Custom Cell Rendering**

```tsx
const columns = [
  {
    label: "Status",
    accessor: "status",
    render: (row) => (
      <Badge
        variant={row.status === "active" ? "default" : "secondary"}
        className="capitalize"
      >
        {row.status}
      </Badge>
    ),
  },
];
```

### **Custom Row Actions**

```tsx
<DataTableContent
  columns={columns}
  data={data}
  onRowClick={(row) => handleRowClick(row)}
  // Or use custom row rendering
  renderRow={(row, index) => (
    <tr key={row.id} className="hover:bg-muted/50">
      {/* Custom row content */}
    </tr>
  )}
/>
```

### **Custom Pagination**

```tsx
<DataTable
  columns={columns}
  data={data}
  pageSize={10}
  total={data.length}
  pagination={
    <div className="flex justify-center space-x-2">
      <Button variant="outline" size="sm">
        Previous
      </Button>
      <span className="py-2 px-4">Page 1 of 5</span>
      <Button variant="outline" size="sm">
        Next
      </Button>
    </div>
  }
/>
```

## 📋 **Best Practices Checklist**

- [ ] **Use composition over inheritance**
- [ ] **Keep components focused and single-purpose**
- [ ] **Use TypeScript for better type safety**
- [ ] **Implement proper accessibility (ARIA labels, keyboard navigation)**
- [ ] **Use CSS variables for theme consistency**
- [ ] **Write unit tests for individual components**
- [ ] **Document component APIs and usage examples**
- [ ] **Use semantic HTML elements**
- [ ] **Implement responsive design**
- [ ] **Add loading and error states**

## 🧪 **Testing Strategy**

```tsx
// Test individual components
describe("DataTableHeader", () => {
  it("renders title and description", () => {
    render(<DataTableHeader title="Test" description="Description" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});

// Test composition
describe("DataTable", () => {
  it("renders with custom header", () => {
    const customHeader = <div data-testid="custom-header">Custom</div>;
    render(
      <DataTable
        columns={[]}
        data={[]}
        pageSize={10}
        total={0}
        header={customHeader}
      />
    );
    expect(screen.getByTestId("custom-header")).toBeInTheDocument();
  });
});
```

## 🎯 **When to Use Each Pattern**

| Pattern          | Use Case                             | Complexity |
| ---------------- | ------------------------------------ | ---------- |
| **Simple Usage** | Basic tables, quick prototypes       | Low        |
| **Custom Props** | Minor customizations                 | Low-Medium |
| **Composition**  | Complex layouts, maximum flexibility | High       |

This approach gives you the flexibility to start simple and scale up as needed, while maintaining consistency and reusability across your application.
