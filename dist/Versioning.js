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
                throw new ts_framework_1.HttpError(`Invalid requested version: ${requestedVersion}`, ts_framework_1.HttpCode.Client.BAD_REQUEST, { current: options.current });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvbmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9WZXJzaW9uaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWlDO0FBQ2pDLCtDQUE4RTtBQVc5RTtJQUNFOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBMEI7UUFDakQsTUFBTSxDQUFDLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFFLElBQWMsRUFBRSxFQUFFO1lBQzdELGlEQUFpRDtZQUNqRCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksZUFBZSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1RCxvQ0FBb0M7WUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLElBQUkseUJBQXlCLENBQUMsQ0FBQztZQUUxRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sSUFBSSx3QkFBUyxDQUFDLDhCQUE4QixnQkFBZ0IsRUFBRSxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNuSSxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRixpREFBaUQ7Z0JBQ2pELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RFLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixJQUFJLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdkYsTUFBTSxJQUFJLHdCQUFTLENBQUMsd0JBQXdCLGdCQUFnQixFQUFFLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUM3SCxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyRixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSwyQkFBMkIsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pGLENBQUM7WUFDSCxDQUFDO1lBRUQsdUJBQXVCO1lBQ3ZCLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBaENELDZCQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHNlbXZlciBmcm9tICdzZW12ZXInO1xuaW1wb3J0IHsgSHR0cEVycm9yLCBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlLCBIdHRwQ29kZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcblxuZXhwb3J0IGludGVyZmFjZSBWZXJzaW9uaW5nT3B0aW9ucyB7XG4gIGN1cnJlbnQ6IHN0cmluZztcbiAgbWluaW11bT86IHN0cmluZztcbiAgcmVjb21tZW5kZWQ/OiBzdHJpbmc7XG4gIGhlYWRlcj86IHN0cmluZztcbiAgcmVxdWVzdGVkSGVhZGVyPzogc3RyaW5nO1xuICByZWNvbW1lbmRlZEhlYWRlcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVyc2lvbmluZyB7XG4gIC8qKlxuICAgKiBUaGUgZXhwcmVzcyBtaWRkbGV3YXJlIGZvciBoYW5kbGluZyBWZXJzaW9uaW5nIHVzaW5nIGhlYWRlcnMuXG4gICAqIFxuICAgKiBAcGFyYW0gcmVxIFRoZSByZXF1ZXN0IGluc3RhbmNlXG4gICAqIEBwYXJhbSByZXMgVGhlIHJlc3BvbnNlIGluc3RhbmNlXG4gICAqIEBwYXJhbSBuZXh0IFRoZSByZWZlcmVuY2UgdG8gdGhlIG1pZGRsZXdhcmUgY2hhaW5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbWlkZGxld2FyZShvcHRpb25zOiBWZXJzaW9uaW5nT3B0aW9ucykge1xuICAgIHJldHVybiAocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAvLyBBZGQgdGhlIGN1cnJlbnQgc2VydmVyIHZlcnNpb24gdG8gdGhlIHJlc3BvbnNlXG4gICAgICByZXMuc2V0KG9wdGlvbnMuaGVhZGVyIHx8ICdYLUFQSS1WZXJzaW9uJywgb3B0aW9ucy5jdXJyZW50KTtcblxuICAgICAgLy8gR2V0IHJlcXVlc3RlZCB2ZXJzaW9uIGZyb20gaGVhZGVyXG4gICAgICBjb25zdCByZXF1ZXN0ZWRWZXJzaW9uID0gcmVxLmhlYWRlcihvcHRpb25zLnJlcXVlc3RlZEhlYWRlciB8fCAnWC1BUEktUmVxdWVzdGVkLVZlcnNpb24nKTtcblxuICAgICAgaWYgKHJlcXVlc3RlZFZlcnNpb24gJiYgIXNlbXZlci52YWxpZChyZXF1ZXN0ZWRWZXJzaW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKGBJbnZhbGlkIHJlcXVlc3RlZCB2ZXJzaW9uOiAke3JlcXVlc3RlZFZlcnNpb259YCwgSHR0cENvZGUuQ2xpZW50LkJBRF9SRVFVRVNULCB7IGN1cnJlbnQ6IG9wdGlvbnMuY3VycmVudCB9KTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdGVkVmVyc2lvbiAmJiAhc2VtdmVyLnNhdGlzZmllcyhyZXF1ZXN0ZWRWZXJzaW9uLCBvcHRpb25zLmN1cnJlbnQpKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2ZXJzaW9uIHNhdGlzZmllcyB0aGUgY3VycmVudCBvbmVcbiAgICAgICAgaWYgKG9wdGlvbnMubWluaW11bSAmJiAhc2VtdmVyLmd0ZShyZXF1ZXN0ZWRWZXJzaW9uLCBvcHRpb25zLm1pbmltdW0pKSB7XG4gICAgICAgICAgcmVzLnNldChvcHRpb25zLnJlY29tbWVuZGVkSGVhZGVyIHx8ICdYLUFQSS1SZWNvbW1lbmRlZC1WZXJzaW9uJywgb3B0aW9ucy5yZWNvbW1lbmRlZCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcihgVW5zdXBwb3J0ZWQgdmVyc2lvbjogJHtyZXF1ZXN0ZWRWZXJzaW9ufWAsIEh0dHBDb2RlLkNsaWVudC5CQURfUkVRVUVTVCwgeyBjdXJyZW50OiBvcHRpb25zLmN1cnJlbnQgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZWNvbW1lbmRlZCAmJiAhc2VtdmVyLmd0ZShyZXF1ZXN0ZWRWZXJzaW9uLCBvcHRpb25zLnJlY29tbWVuZGVkKSkge1xuICAgICAgICAgIHJlcy5zZXQob3B0aW9ucy5yZWNvbW1lbmRlZEhlYWRlciB8fCAnWC1BUEktUmVjb21tZW5kZWQtVmVyc2lvbicsIG9wdGlvbnMucmVjb21tZW5kZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvbnRpbnVlIHRoZSByZXF1ZXN0XG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9XG59Il19