"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const semver = require("semver");
const ts_framework_1 = require("ts-framework");
class Versioning {
    /**
     * The express middleware for handling Versioning using headers.
     *
     * @param req The request instance
     * @param res The response instance
     * @param next The reference to the middleware chain
     */
    static middleware(options) {
        return (req, res, next) => {
            // Add the current server version to the response
            res.set(options.header || 'X-API-Version', options.current);
            // Get requested version from header
            const requestedVersion = req.header(options.requestedHeader || 'X-API-Requested-Version');
            if (requestedVersion && !semver.valid(requestedVersion)) {
                // Could not recognize the semver requested version
                throw new ts_framework_1.HttpError(`Invalid requested version: ${requestedVersion}`, ts_framework_1.HttpCode.Client.BAD_REQUEST, { current: options.current });
            }
            else if (requestedVersion && semver.lt(options.current, requestedVersion)) {
                throw new ts_framework_1.HttpError(`Unsupported version: ${requestedVersion}`, ts_framework_1.HttpCode.Client.BAD_REQUEST, { current: options.current });
            }
            else if (requestedVersion && !semver.satisfies(requestedVersion, options.current)) {
                // Check if the version satisfies the current one
                if (options.minimum && !semver.gte(requestedVersion, options.minimum)) {
                    res.set(options.recommendedHeader || 'X-API-Recommended-Version', options.recommended);
                    throw new ts_framework_1.HttpError(`Unsupported version: ${requestedVersion}`, ts_framework_1.HttpCode.Client.BAD_REQUEST, { current: options.current });
                }
                else if (options.recommended && !semver.gte(requestedVersion, options.recommended)) {
                    res.set(options.recommendedHeader || 'X-API-Recommended-Version', options.recommended);
                }
            }
            // Continue the request
            next();
        };
    }
}
exports.default = Versioning;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvbmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9WZXJzaW9uaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWlDO0FBQ2pDLCtDQUE4RTtBQVc5RTtJQUNFOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBMEI7UUFDakQsTUFBTSxDQUFDLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFFLElBQWMsRUFBRSxFQUFFO1lBQzdELGlEQUFpRDtZQUNqRCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksZUFBZSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1RCxvQ0FBb0M7WUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLElBQUkseUJBQXlCLENBQUMsQ0FBQztZQUUxRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELG1EQUFtRDtnQkFDbkQsTUFBTSxJQUFJLHdCQUFTLENBQUMsOEJBQThCLGdCQUFnQixFQUFFLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ25JLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxNQUFNLElBQUksd0JBQVMsQ0FBQyx3QkFBd0IsZ0JBQWdCLEVBQUUsRUFBRSx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDN0gsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEYsaURBQWlEO2dCQUNqRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSwyQkFBMkIsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3ZGLE1BQU0sSUFBSSx3QkFBUyxDQUFDLHdCQUF3QixnQkFBZ0IsRUFBRSxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDN0gsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksMkJBQTJCLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6RixDQUFDO1lBQ0gsQ0FBQztZQUVELHVCQUF1QjtZQUN2QixJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQW5DRCw2QkFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzZW12ZXIgZnJvbSAnc2VtdmVyJztcbmltcG9ydCB7IEh0dHBFcnJvciwgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgSHR0cENvZGUgfSBmcm9tIFwidHMtZnJhbWV3b3JrXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2lvbmluZ09wdGlvbnMge1xuICBjdXJyZW50OiBzdHJpbmc7XG4gIG1pbmltdW0/OiBzdHJpbmc7XG4gIHJlY29tbWVuZGVkPzogc3RyaW5nO1xuICBoZWFkZXI/OiBzdHJpbmc7XG4gIHJlcXVlc3RlZEhlYWRlcj86IHN0cmluZztcbiAgcmVjb21tZW5kZWRIZWFkZXI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnNpb25pbmcge1xuICAvKipcbiAgICogVGhlIGV4cHJlc3MgbWlkZGxld2FyZSBmb3IgaGFuZGxpbmcgVmVyc2lvbmluZyB1c2luZyBoZWFkZXJzLlxuICAgKiBcbiAgICogQHBhcmFtIHJlcSBUaGUgcmVxdWVzdCBpbnN0YW5jZVxuICAgKiBAcGFyYW0gcmVzIFRoZSByZXNwb25zZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0gbmV4dCBUaGUgcmVmZXJlbmNlIHRvIHRoZSBtaWRkbGV3YXJlIGNoYWluXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1pZGRsZXdhcmUob3B0aW9uczogVmVyc2lvbmluZ09wdGlvbnMpIHtcbiAgICByZXR1cm4gKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikgPT4ge1xuICAgICAgLy8gQWRkIHRoZSBjdXJyZW50IHNlcnZlciB2ZXJzaW9uIHRvIHRoZSByZXNwb25zZVxuICAgICAgcmVzLnNldChvcHRpb25zLmhlYWRlciB8fCAnWC1BUEktVmVyc2lvbicsIG9wdGlvbnMuY3VycmVudCk7XG5cbiAgICAgIC8vIEdldCByZXF1ZXN0ZWQgdmVyc2lvbiBmcm9tIGhlYWRlclxuICAgICAgY29uc3QgcmVxdWVzdGVkVmVyc2lvbiA9IHJlcS5oZWFkZXIob3B0aW9ucy5yZXF1ZXN0ZWRIZWFkZXIgfHwgJ1gtQVBJLVJlcXVlc3RlZC1WZXJzaW9uJyk7XG5cbiAgICAgIGlmIChyZXF1ZXN0ZWRWZXJzaW9uICYmICFzZW12ZXIudmFsaWQocmVxdWVzdGVkVmVyc2lvbikpIHtcbiAgICAgICAgLy8gQ291bGQgbm90IHJlY29nbml6ZSB0aGUgc2VtdmVyIHJlcXVlc3RlZCB2ZXJzaW9uXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoYEludmFsaWQgcmVxdWVzdGVkIHZlcnNpb246ICR7cmVxdWVzdGVkVmVyc2lvbn1gLCBIdHRwQ29kZS5DbGllbnQuQkFEX1JFUVVFU1QsIHsgY3VycmVudDogb3B0aW9ucy5jdXJyZW50IH0pO1xuICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0ZWRWZXJzaW9uICYmIHNlbXZlci5sdChvcHRpb25zLmN1cnJlbnQsIHJlcXVlc3RlZFZlcnNpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoYFVuc3VwcG9ydGVkIHZlcnNpb246ICR7cmVxdWVzdGVkVmVyc2lvbn1gLCBIdHRwQ29kZS5DbGllbnQuQkFEX1JFUVVFU1QsIHsgY3VycmVudDogb3B0aW9ucy5jdXJyZW50IH0pO1xuICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0ZWRWZXJzaW9uICYmICFzZW12ZXIuc2F0aXNmaWVzKHJlcXVlc3RlZFZlcnNpb24sIG9wdGlvbnMuY3VycmVudCkpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZlcnNpb24gc2F0aXNmaWVzIHRoZSBjdXJyZW50IG9uZVxuICAgICAgICBpZiAob3B0aW9ucy5taW5pbXVtICYmICFzZW12ZXIuZ3RlKHJlcXVlc3RlZFZlcnNpb24sIG9wdGlvbnMubWluaW11bSkpIHtcbiAgICAgICAgICByZXMuc2V0KG9wdGlvbnMucmVjb21tZW5kZWRIZWFkZXIgfHwgJ1gtQVBJLVJlY29tbWVuZGVkLVZlcnNpb24nLCBvcHRpb25zLnJlY29tbWVuZGVkKTtcbiAgICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKGBVbnN1cHBvcnRlZCB2ZXJzaW9uOiAke3JlcXVlc3RlZFZlcnNpb259YCwgSHR0cENvZGUuQ2xpZW50LkJBRF9SRVFVRVNULCB7IGN1cnJlbnQ6IG9wdGlvbnMuY3VycmVudCB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnJlY29tbWVuZGVkICYmICFzZW12ZXIuZ3RlKHJlcXVlc3RlZFZlcnNpb24sIG9wdGlvbnMucmVjb21tZW5kZWQpKSB7XG4gICAgICAgICAgcmVzLnNldChvcHRpb25zLnJlY29tbWVuZGVkSGVhZGVyIHx8ICdYLUFQSS1SZWNvbW1lbmRlZC1WZXJzaW9uJywgb3B0aW9ucy5yZWNvbW1lbmRlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ29udGludWUgdGhlIHJlcXVlc3RcbiAgICAgIG5leHQoKTtcbiAgICB9XG4gIH1cbn0iXX0=