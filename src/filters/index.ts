import type { TodoItem } from "../todos/types";

interface Filter {
  id: string;
  title: string;
  type: FilterType;
  predicate: (task: TodoItem) => boolean;
  async?: boolean;
}

enum FilterType {
  PRESET = "preset",
  PROJECT = "project",
  CONTEXT = "context",
  CUSTOM = "custom",
}

interface FilterCondition {
  id: string;
  field: FilterField;
  operator: FilterOperator;
  value: string | number | Date | boolean;
}

enum FilterField {
  TEXT = "text",
  COMPLETED = "completed",
  PRIORITY = "priority",
  PROJECT = "project",
  CONTEXT = "context",
  CREATED_DATE = "createdDate",
  COMPLETION_DATE = "completionDate",
  DUE_DATE = "dueDate",
}

enum FilterOperator {
  IS = "is",
  IS_NOT = "isNot",
  CONTAINS = "contains",
  NOT_CONTAINS = "notContains",
  MATCHES = "matches",

  IS_TRUE = "isTrue",
  IS_FALSE = "isFalse",

  EQUALS = "equals",
  NOT_EQUALS = "notEquals",
  GREATER_THAN = "greaterThan",
  LESS_THAN = "lessThan",
  GREATER_THAN_OR_EQUAL = "greaterThanOrEqual",
  LESS_THAN_OR_EQUAL = "lessThanOrEqual",

  IS_BEFORE = "isBefore",
  IS_AFTER = "isAfter",
  IS_ON = "isOn",
  IS_TODAY = "isToday",
  IS_YESTERDAY = "isYesterday",
  IS_TOMORROW = "isTomorrow",
  IS_THIS_WEEK = "isThisWeek",
  IS_NEXT_WEEK = "isNextWeek",
}

interface FilterGroup {
  id: string;
  conditions: Array<FilterCondition | FilterGroup>;
  conjunction: "AND" | "OR";
}

interface CustomFilter extends Filter {
  type: FilterType.CUSTOM;
  filterGroup: FilterGroup;
  lastUpdated: Date;
}
