import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LogIn,
  FileText,
  Link2,
  Table,
  Upload,
  AlertCircle,
  RefreshCw,
  Settings,
  Video,
  List,
  ChevronDown,
  Frame,
  Award,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Login", url: "/login", icon: LogIn },
  { title: "Forms", url: "/forms", icon: FileText },
  { title: "Links", url: "/links", icon: Link2 },
  { title: "Tables", url: "/tables", icon: Table },
  { title: "Upload/Download", url: "/upload-download", icon: Upload },
  { title: "Test Recorder", url: "/recorder", icon: Video },
  { title: "Recorded Actions", url: "/recorded-actions", icon: List },
  { title: "Credits", url: "/credits", icon: Award },
];

const alertItems = [
  { title: "Simple Alert", url: "/alerts/simple" },
  { title: "Confirm Alert", url: "/alerts/confirm" },
  { title: "Prompt Alert", url: "/alerts/prompt" },
];

const dynamicItems = [
  { title: "Show/Hide", url: "/dynamic/show-hide" },
  { title: "Progress Bar", url: "/dynamic/progress-bar" },
  { title: "Countdown", url: "/dynamic/countdown" },
];

const advancedItems = [
  { title: "Shadow DOM", url: "/advanced/shadow-dom" },
  { title: "Drag & Drop", url: "/advanced/drag-drop" },
  { title: "Infinite Scroll", url: "/advanced/infinite-scroll" },
  { title: "AJAX Table", url: "/advanced/ajax-table" },
];

const iframeItems = [
  { title: "Basic Iframe", url: "/iframes/basic" },
  { title: "Nested Iframes", url: "/iframes/nested" },
  { title: "Multiple Iframes", url: "/iframes/multiple" },
  { title: "Scrollable Iframe", url: "/iframes/scrollable" },
  { title: "Iframe Links", url: "/iframes/links" },
  { title: "Iframe Form", url: "/iframes/form" },
];

const dropdownItems = [
  { title: "Standard Dropdown", url: "/dropdowns/standard" },
  { title: "Multi-Select", url: "/dropdowns/multi" },
  { title: "Custom Dropdown", url: "/dropdowns/custom" },
  { title: "Disabled Dropdown", url: "/dropdowns/disabled" },
  { title: "Dependent Dropdown", url: "/dropdowns/dependent" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (items: typeof alertItems) => 
    items.some((item) => currentPath === item.url);

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent className="pt-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-primary font-bold text-xs uppercase tracking-wider mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link 
                      to={item.url} 
                      className="flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-sidebar-accent group"
                    >
                      <item.icon className="h-4 w-4 text-primary group-hover:text-primary-hover transition-colors" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Alerts Section */}
        <SidebarGroup>
          <Collapsible defaultOpen={isGroupActive(alertItems)} className="group/collapsible">
            <SidebarGroupLabel className="text-sidebar-primary font-bold text-xs uppercase tracking-wider mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-primary-hover transition-colors">
                <span className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {!collapsed && "Alerts"}
                </span>
                {!collapsed && <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {alertItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <Link 
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2 pl-8 rounded-md transition-all hover:bg-sidebar-accent text-sm"
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Dynamic Content Section */}
        <SidebarGroup>
          <Collapsible defaultOpen={isGroupActive(dynamicItems)} className="group/collapsible">
            <SidebarGroupLabel className="text-sidebar-primary font-bold text-xs uppercase tracking-wider mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-primary-hover transition-colors">
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  {!collapsed && "Dynamic"}
                </span>
                {!collapsed && <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {dynamicItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <Link 
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2 pl-8 rounded-md transition-all hover:bg-sidebar-accent text-sm"
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Advanced Testing Section */}
        <SidebarGroup>
          <Collapsible defaultOpen={isGroupActive(advancedItems)} className="group/collapsible">
            <SidebarGroupLabel className="text-sidebar-primary font-bold text-xs uppercase tracking-wider mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-primary-hover transition-colors">
                <span className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {!collapsed && "Advanced"}
                </span>
                {!collapsed && <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {advancedItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <Link 
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2 pl-8 rounded-md transition-all hover:bg-sidebar-accent text-sm"
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Iframes Section */}
        <SidebarGroup>
          <Collapsible defaultOpen={isGroupActive(iframeItems)} className="group/collapsible">
            <SidebarGroupLabel className="text-sidebar-primary font-bold text-xs uppercase tracking-wider mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-primary-hover transition-colors">
                <span className="flex items-center gap-2">
                  <Frame className="h-4 w-4" />
                  {!collapsed && "Iframes"}
                </span>
                {!collapsed && <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {iframeItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <Link 
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2 pl-8 rounded-md transition-all hover:bg-sidebar-accent text-sm"
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Dropdowns Section */}
        <SidebarGroup>
          <Collapsible defaultOpen={isGroupActive(dropdownItems)} className="group/collapsible">
            <SidebarGroupLabel className="text-sidebar-primary font-bold text-xs uppercase tracking-wider mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-primary-hover transition-colors">
                <span className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4" />
                  {!collapsed && "Dropdowns"}
                </span>
                {!collapsed && <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {dropdownItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <Link 
                          to={item.url}
                          className="flex items-center gap-3 px-3 py-2 pl-8 rounded-md transition-all hover:bg-sidebar-accent text-sm"
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
