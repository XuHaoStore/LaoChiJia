-- ============================================================
-- 老吃家数据库设计
-- Supabase PostgreSQL
-- ============================================================

-- 1. 用户表 (users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(20) UNIQUE,           -- 手机号
    nickname VARCHAR(50),                -- 昵称
    avatar_url TEXT,                     -- 头像URL
    foodie_points INTEGER DEFAULT 100,   -- 吃货分
    preference_tags TEXT[],               -- 口味偏好标签
    status VARCHAR(20) DEFAULT 'active', -- active/banned
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 美食推荐表 (recommendations)
CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    shop_name VARCHAR(200) NOT NULL,    -- 店铺名称
    address TEXT,                        -- 店铺地址
    price_range INTEGER,                 -- 人均价格
    content TEXT NOT NULL,               -- 推荐内容
    images TEXT[],                       -- 图片URL数组
    tags TEXT[],                        -- 标签（口味、菜系等）
    cuisine_type VARCHAR(50),            -- 菜系类型
    location GEOGRAPHY(POINT),           -- 地理位置
    avg_rating DECIMAL(2,1) DEFAULT 0,   -- 平均评分
    rating_count INTEGER DEFAULT 0,      -- 评分次数
    like_count INTEGER DEFAULT 0,        -- 点赞数
    favorite_count INTEGER DEFAULT 0,    -- 收藏数
    view_count INTEGER DEFAULT 0,        -- 浏览数
    status VARCHAR(20) DEFAULT 'pending', -- pending/approved/rejected
    is_hot BOOLEAN DEFAULT FALSE,       -- 是否热门
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 评价表 (reviews)
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recommendation_id UUID REFERENCES recommendations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5), -- 1-5星
    content TEXT,                        -- 评价内容
    has_been_there BOOLEAN DEFAULT FALSE, -- 是否已去过
    is_negative BOOLEAN DEFAULT FALSE,  -- 是否为差评
    is_reconsidered BOOLEAN DEFAULT FALSE, -- 是否已复议
    parent_review_id UUID REFERENCES reviews(id), -- 复议的原始评价
    like_count INTEGER DEFAULT 0,       -- 点赞数
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 收藏表 (favorites)
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recommendation_id UUID REFERENCES recommendations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recommendation_id)
);

-- 5. 点赞表 (likes)
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recommendation_id UUID REFERENCES recommendations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recommendation_id)
);

-- 6. 关注表 (follows)
CREATE TABLE follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(follower_id, following_id)
);

-- 7. 吃货分记录表 (points_history)
CREATE TABLE points_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,        -- 行为类型
    points_change INTEGER NOT NULL,     -- 分数变化（正负）
    reason TEXT,                        -- 原因
    related_id UUID,                    -- 关联ID（推荐或评价ID）
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. 话题表 (topics)
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    cover_image TEXT,
    view_count INTEGER DEFAULT 0,
    post_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 消息通知表 (notifications)
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,          -- like/review/follow/system
    title VARCHAR(200),
    content TEXT,
    related_id UUID,                   -- 关联ID
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 索引
-- ============================================================

CREATE INDEX idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX idx_recommendations_status ON recommendations(status);
CREATE INDEX idx_recommendations_created_at ON recommendations(created_at DESC);
CREATE INDEX idx_recommendations_location ON recommendations(location);

CREATE INDEX idx_reviews_recommendation_id ON reviews(recommendation_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

CREATE INDEX idx_points_history_user_id ON points_history(user_id);
CREATE INDEX idx_points_history_created_at ON points_history(created_at DESC);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- ============================================================
-- 行级安全策略 (RLS)
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的详细信息
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- 用户可以更新自己的信息
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- 所有人都可以查看已发布的推荐
CREATE POLICY "Anyone can view approved recommendations" ON recommendations
    FOR SELECT USING (status = 'approved');

-- 用户可以创建推荐
CREATE POLICY "Users can create recommendations" ON recommendations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户可以更新自己的推荐
CREATE POLICY "Users can update own recommendations" ON recommendations
    FOR UPDATE USING (auth.uid() = user_id);

-- 所有人都可以查看已发布的评价
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

-- 用户可以创建评价
CREATE POLICY "Users can create reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户只能查看自己的收藏
CREATE POLICY "Users can view own favorites" ON favorites
    FOR SELECT USING (auth.uid() = user_id);

-- 用户可以添加收藏
CREATE POLICY "Users can add favorites" ON favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户可以删除自己的收藏
CREATE POLICY "Users can delete own favorites" ON favorites
    FOR DELETE USING (auth.uid() = user_id);

-- 用户只能查看自己的通知
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

-- 用户只能查看自己的积分记录
CREATE POLICY "Users can view own points history" ON points_history
    FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- 触发器
-- ============================================================

-- 自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_recommendations_updated_at
    BEFORE UPDATE ON recommendations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 自动更新推荐的平均评分
CREATE OR REPLACE FUNCTION update_recommendation_avg_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE recommendations
    SET avg_rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews
        WHERE recommendation_id = NEW.recommendation_id
    ),
    rating_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE recommendation_id = NEW.recommendation_id
    )
    WHERE id = NEW.recommendation_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_recommendation_avg_rating();

-- ============================================================
-- 初始数据
-- ============================================================

-- 插入默认话题
INSERT INTO topics (name, description) VALUES
('北京美食', '老北京人都爱吃的地道美食，你吃过几家？'),
('周末聚餐', '周末去哪吃？推荐合集来啦！'),
('深夜食堂', '深夜美食推荐'),
('减脂餐', '健康美味两不误'),
('探店日记', '记录每一次美食探索之旅');

-- ============================================================
-- 辅助函数
-- ============================================================

-- 获取用户发布的推荐列表
CREATE OR REPLACE FUNCTION get_user_recommendations(p_user_id UUID)
RETURNS SETOF recommendations AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM recommendations
    WHERE user_id = p_user_id
    ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 获取用户的收藏列表
CREATE OR REPLACE FUNCTION get_user_favorites(p_user_id UUID)
RETURNS SETOF recommendations AS $$
BEGIN
    RETURN QUERY
    SELECT r.* FROM recommendations r
    INNER JOIN favorites f ON r.id = f.recommendation_id
    WHERE f.user_id = p_user_id
    ORDER BY f.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 获取用户的积分变动记录
CREATE OR REPLACE FUNCTION get_user_points_history(p_user_id UUID, p_limit INTEGER DEFAULT 20)
RETURNS SETOF points_history AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM points_history
    WHERE user_id = p_user_id
    ORDER BY created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 获取热门推荐
CREATE OR REPLACE FUNCTION get_hot_recommendations(p_limit INTEGER DEFAULT 10)
RETURNS SETOF recommendations AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM recommendations
    WHERE status = 'approved'
    ORDER BY (avg_rating * rating_count + like_count * 0.5 + favorite_count * 0.3) DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
