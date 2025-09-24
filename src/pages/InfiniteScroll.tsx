import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Loader2, RotateCcw, Eye } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

interface ScrollItem {
  id: number;
  title: string;
  description: string;
  color: string;
}

const InfiniteScroll = () => {
  const [items, setItems] = useState<ScrollItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'];

  const generateItems = (pageNum: number): ScrollItem[] => {
    const startId = (pageNum - 1) * 10 + 1;
    return Array.from({ length: 10 }, (_, index) => ({
      id: startId + index,
      title: `Item ${startId + index}`,
      description: `This is the description for item ${startId + index}. Generated on page ${pageNum}.`,
      color: colors[(startId + index - 1) % colors.length]
    }));
  };

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newItems = generateItems(page);
    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setLoading(false);
    
    // Stop loading after 50 items (5 pages)
    if (page >= 5) {
      setHasMore(false);
    }
  }, [loading, hasMore, page]);

  const resetScroll = () => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreItems, hasMore, loading]);

  // Load initial items
  useEffect(() => {
    if (items.length === 0) {
      loadMoreItems();
    }
  }, []);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="infinite-scroll-title">
            🔄 Infinite Scroll Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice handling infinite scroll scenarios with dynamic content loading.
            Essential for testing lazy-loaded content and pagination alternatives.
          </p>
        </div>

        {/* Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary" id="items-count">
                  {items.length}
                </div>
                <div className="text-sm text-muted-foreground">Items Loaded</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary" id="page-count">
                  {page - 1}
                </div>
                <div className="text-sm text-muted-foreground">Pages Loaded</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${loading ? 'text-yellow-500' : hasMore ? 'text-green-500' : 'text-red-500'}`} id="loading-status">
                  {loading ? 'Loading...' : hasMore ? 'Active' : 'Complete'}
                </div>
                <div className="text-sm text-muted-foreground">Status</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent" id="remaining-pages">
                  {hasMore ? Math.max(0, 5 - (page - 1)) : 0}
                </div>
                <div className="text-sm text-muted-foreground">Pages Left</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-center gap-2">
              <Button 
                onClick={loadMoreItems}
                disabled={loading || !hasMore}
                id="load-more-btn"
                variant="default"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <ArrowDown className="mr-2 h-4 w-4" />
                    Load More
                  </>
                )}
              </Button>
              <Button 
                onClick={scrollToBottom}
                id="scroll-to-bottom-btn"
                variant="secondary"
              >
                <Eye className="mr-2 h-4 w-4" />
                Scroll to Bottom
              </Button>
              <Button 
                onClick={resetScroll}
                id="reset-scroll-btn"
                variant="outline"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Infinite Scroll Container */}
        <Card>
          <CardHeader>
            <CardTitle>Scrollable Content Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={scrollContainerRef}
              className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4"
              id="scroll-container"
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border ${item.color} transition-all hover:shadow-md`}
                  id={`scroll-item-${item.id}`}
                >
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="text-xs text-muted-foreground mt-2">
                    Item ID: {item.id} | Position: {items.findIndex(i => i.id === item.id) + 1}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex justify-center py-8" id="scroll-loading">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Loading more items...</p>
                  </div>
                </div>
              )}

              {/* End of content indicator */}
              {!hasMore && items.length > 0 && (
                <div className="text-center py-8 border-t" id="scroll-complete">
                  <p className="text-muted-foreground">🎉 You've reached the end!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    All {items.length} items have been loaded.
                  </p>
                </div>
              )}

              {/* Intersection observer target */}
              <div ref={observerRef} className="h-4" id="scroll-trigger" />
            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium Infinite Scroll Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Scrolling Strategies:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Scroll to bottom<br />
                    ((JavascriptExecutor) driver)<br />
                    .executeScript("arguments[0].scrollTop = arguments[0].scrollHeight", scrollContainer);
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Scroll by amount<br />
                    ((JavascriptExecutor) driver)<br />
                    .executeScript("arguments[0].scrollBy(0, 500)", scrollContainer);
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dynamic Content Testing:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Wait for new items to load after scrolling</li>
                  <li>• Count elements before and after scroll</li>
                  <li>• Test loading indicators appearance</li>
                  <li>• Verify end-of-content detection</li>
                  <li>• Handle scroll position restoration</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">⚡ Performance Tips:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Use WebDriverWait for content loading</li>
                <li>• Implement retry logic for slow networks</li>
                <li>• Test with different scroll speeds</li>
                <li>• Verify memory usage with large datasets</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InfiniteScroll;