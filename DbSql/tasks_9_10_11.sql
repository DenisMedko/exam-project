--task 9 (count users by role)
SELECT role,
    count(*) as qty
FROM "Users"
GROUP BY "role";
--task 10 (customer +10% to balance from order by period)
WITH "Prizers" AS (
    SELECT "Prizers"."id",
        sum("Contests"."prize") as "ordersSum"
    FROM "Users" as "Prizers"
        INNER JOIN "Contests" ON "Prizers"."id" = "Contests"."userId"
        AND date_trunc('day', "Contests"."createdAt") Between '2022-12-25' AND '2023-01-14'
    WHERE "Prizers"."role" = 'customer'
    GROUP BY "Prizers"."id"
)
UPDATE "Users"
SET "balance" = "balance" + "Prizers"."ordersSum" * 0.1
FROM (
        SELECT "id",
            "ordersSum"
        FROM "Prizers"
    ) as "Prizers"
WHERE "Users"."id" = "Prizers"."id";
--task 11 (creative +$10 to balance by 3 best rating)
UPDATE "Users"
SET "balance" = "balance" + 10
WHERE "id" IN (
        SELECT "id"
        FROM "Users"
        WHERE "role" = 'creator'
        ORDER BY "rating" DESC
        LIMIT 3
    );